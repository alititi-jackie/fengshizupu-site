import {chromium} from '@playwright/test';import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});let checked=0;
for(const viewport of [{width:390,height:844},{width:1440,height:1000}]){const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4173/');await page.screenshot({path:`/tmp/site-${viewport.width}.png`,fullPage:true});assert(await page.locator('h1').count());assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.context().route('https://enping.fengshizupu.com/**',route=>route.fulfill({status:200,body:'Enping search'}));
const form=page.getByRole('form',{name:'搜索恩平族谱'});
await form.locator('input[name=q]').fill('允思');
const [popup]=await Promise.all([page.context().waitForEvent('page'),form.getByRole('button',{name:'搜索'}).click()]);
await popup.waitForLoadState();
assert.equal(new URL(popup.url()).origin,'https://enping.fengshizupu.com');
assert.equal(new URL(popup.url()).searchParams.get('q'),'允思');
await popup.close();
assert.equal(await page.locator('.mainnav a').allTextContents().then(labels=>labels.slice(0,3).join('/')),'首页/资讯/族谱');
for(const path of ['/news/','/news/enping/','/news/general/','/news/general/feng-surname-origin/']){
 await page.goto('http://127.0.0.1:4173'+path);
 assert.equal(await page.getByRole('form',{name:'搜索恩平族谱'}).count(),0);
}
await page.goto('http://127.0.0.1:4173/news/enping/enping-feng-roots/');
assert(await page.getByRole('form',{name:'搜索恩平族谱'}).isVisible());
assert.equal(await page.getByRole('link',{name:'小湴村',exact:true}).first().getAttribute('href'),'https://enping.fengshizupu.com/editions/v000100/');
await page.goto('http://127.0.0.1:4173/archives/');
const archive=page.getByRole('link',{name:'小湴村凝斋房',exact:true});
assert.equal(await archive.getAttribute('href'),'https://enping.fengshizupu.com/editions/v000100/2026/a000100/');
assert.equal(await archive.getAttribute('target'),'_blank');
const [archivePopup]=await Promise.all([page.context().waitForEvent('page'),archive.click()]);
await archivePopup.waitForLoadState();
assert.equal(archivePopup.url(),'https://enping.fengshizupu.com/editions/v000100/2026/a000100/');
await archivePopup.close();
for(const retired of ['/archives/a000100/','/archives/a000100/book.pdf','/persons/p000001/','/originals/a000100/','/search/','/regions/']){
 assert.equal((await page.request.get('http://127.0.0.1:4173'+retired)).status(),404);
}
await page.goto('http://127.0.0.1:4173/news/enping-feng-roots/');
await page.waitForURL('**/news/enping/enping-feng-roots/');
await page.goto('http://127.0.0.1:4173/enping-fengshi-juanshou/');assert.equal(await page.locator('.juanshou-pages img').count(),17);assert.equal(await page.locator('a[href$=".pdf"]').count(),0);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const full=page.getByRole('link',{name:'查看完整的恩平冯氏族谱',exact:true});assert.equal(await full.getAttribute('href'),'https://enping.fengshizupu.com/');assert.equal(await full.getAttribute('target'),'_blank');await page.getByRole('button',{name:'放大第 1 页',exact:true}).click();assert(await page.locator('dialog').isVisible());await page.getByRole('button',{name:'放大查看',exact:true}).click();assert(await page.locator('dialog img').evaluate(img=>img.getBoundingClientRect().width>1000));await page.getByRole('button',{name:'关闭',exact:true}).click();assert(!(await page.locator('dialog').isVisible()));await page.screenshot({path:`/tmp/site-juanshou-${viewport.width}.png`});assert.deepEqual(errors,[]);checked++;await page.close()}
await browser.close();console.log(`Browser flows passed for ${checked} viewports`);
