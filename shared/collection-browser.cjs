const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try { for (const width of [320, 390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  // UI-only PR checks reuse unchanged published scans; production builds use local renders.
  if (process.env.FAMILY_UI_REMOTE_SCANS === '1') {
    const domain = require('../data/site.json').domain;
    await page.route('**/img/**', async route => {
      const path = new URL(route.request().url()).pathname;
      const response = await route.fetch({ url: domain + path });
      assert(response.ok(), `Published original scan missing: ${path}`);
      await route.fulfill({ response });
    });
  }
  await page.goto('http://127.0.0.1:4173/');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.equal(await page.evaluate(() => getComputedStyle(document.body).fontSize), width <= 650 ? '16px' : '18px');
  const count = await page.locator('.book-cards .enping-card:visible').count(); assert(count > 0);
  await page.locator('#bookSearch').fill('不存在的书名');
  assert.equal(await page.locator('.book-cards .enping-card:visible').count(), 0);
  await page.locator('#bookSearch').fill('');
  assert.equal(await page.locator('.book-cards .enping-card:visible').count(), count);
  await page.locator('.book-cards .enping-card').first().click();
  await page.locator('.list a').first().click();
  await page.locator('#mSingle').click();
  await page.waitForFunction(() => document.querySelector('#pg').naturalWidth > 0);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'reader toolbar overflow');
  await page.locator('#next').click(); await page.waitForURL('**p=2');
  if(width <= 650) await page.locator('#jumpToggle').click();
  await page.locator('#jump').fill('3'); await page.locator('#jumpBtn').click(); await page.waitForURL('**p=3');
  await page.locator('#singlePage').click(); await page.locator('#imageDialog[open]').waitFor();
  await page.locator('#imageZoom').click(); assert(await page.locator('#imageLarge.zoomed').count());
  await page.locator('#imageClose').click();
  await page.locator('#mScroll').click(); assert(await page.locator('#scrollView .spage').count());
  assert(await page.locator('.dlrow a').count());
  await page.screenshot({ path: `site-${width}.png`, fullPage: true });
  assert.deepEqual(errors, []); await page.close();
 } } finally { await browser.close(); }
 console.log('Collection search and reading flows passed at 320, 390, 1440px');
})().catch(error => { console.error(error); process.exit(1); });
