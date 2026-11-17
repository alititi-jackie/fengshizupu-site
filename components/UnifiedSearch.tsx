'use client';

import { useEffect, useState } from 'react';

type Entry = { g: string; t: string; d: string; u: string; s: string; ts: string };
type PageRef = { t: string; u: string };
type IndexData = {
  groups: { id: string; name: string }[];
  entries: Entry[];
  numeric: Record<string, PageRef>;
  scoped: Record<string, Record<string, PageRef>>;
  t2s: Record<string, string>;
};

const GROUP_CAP = 40;

export default function UnifiedSearch() {
  const [data, setData] = useState<IndexData | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get('q') || '');
    fetch('/search-index.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const form = (
    <form className="hero-search" action="/search/" method="get" aria-label="搜索全站族谱">
      <input type="text" name="q" defaultValue={q} aria-label="搜索全站族谱：输入村名、房支、姓名、谱书名或书页码"
        placeholder="搜索全站族谱：输入村名、房支、姓名、谱书名或书页码" required />
      <button type="submit">搜索</button>
    </form>
  );

  if (!q) {
    return (
      <>
        {form}
        <p className="search-status">可以搜索：恩平冯氏族谱原书（房支、村庄、页码）、小湴村凝斋房 2026 版（姓名）、各地冯氏族谱收藏（谱书名、地名、堂号）、本站资讯。</p>
        <p className="search-note">试试：
          <a href="/search/?q=小湴村">小湴村</a>、
          <a href="/search/?q=凝斋房">凝斋房</a>、
          <a href="/search/?q=浣溪">浣溪</a>、
          <a href="/search/?q=729">729（恩平原书页码）</a>
        </p>
      </>
    );
  }
  if (failed) {
    return (
      <>
        {form}
        <p className="search-status">搜索索引加载失败，请稍后重试；也可以先用<a href="https://enping.fengshizupu.com/">恩平冯氏族谱站内搜索</a>。</p>
      </>
    );
  }
  if (!data) {
    return (
      <>
        {form}
        <p className="search-status">正在加载搜索索引…</p>
      </>
    );
  }

  const norm = (s: string) => s.split('').map((c) => data.t2s[c] || c).join('').toLowerCase();
  const nq = norm(q).trim();
  const terms = nq.split(/\s+/).filter(Boolean);

  // 页码直达：纯数字 = 恩平原书页码；「卷首 N」「目录（前组）N」等 = 分卷页码
  let pageHit: PageRef | null = null;
  if (/^\d+$/.test(nq) && data.numeric[nq]) pageHit = data.numeric[nq];
  const scopedMatch = nq.replace(/\(/g, '（').replace(/\)/g, '）')
    .match(/^(卷首|目录（前组）|目录（后组）)(\d+)$/);
  if (!pageHit && scopedMatch && data.scoped[scopedMatch[1]]) {
    pageHit = data.scoped[scopedMatch[1]][scopedMatch[2]] || null;
  }

  const hits = data.entries
    .map((e, i) => {
      if (!terms.every((t) => e.s.includes(t))) return null;
      const titleHits = terms.filter((t) => e.ts.includes(t)).length;
      const pos = e.s.indexOf(terms[0]);
      return { e, i, score: titleHits * 100000 - pos };
    })
    .filter((x): x is { e: Entry; i: number; score: number } => x !== null)
    .sort((a, b) => b.score - a.score || a.i - b.i);

  const byGroup = data.groups.map((g) => ({
    ...g,
    list: hits.filter((h) => h.e.g === g.id),
  })).filter((g) => g.list.length > 0);
  const total = hits.length + (pageHit ? 1 : 0);

  return (
    <>
      {form}
      <p className="search-status">“{q}”共找到 {total} 条结果</p>
      {pageHit && (
        <section className="search-group">
          <h2>页码直达</h2>
          <div className="search-rows">
            <a className="search-row" href={pageHit.u}>
              <span className="search-row-t">{pageHit.t}</span>
              <span className="search-row-d">恩平冯氏族谱原书 · 点击打开阅读器</span>
            </a>
          </div>
        </section>
      )}
      {byGroup.map((g) => (
        <section className="search-group" key={g.id}>
          <h2>{g.name}<small>共 {g.list.length} 条</small></h2>
          <div className="search-rows">
            {g.list.slice(0, GROUP_CAP).map((h) => (
              <a className="search-row" key={h.e.u + h.e.t} href={h.e.u}>
                <span className="search-row-t">{h.e.t}</span>
                {h.e.d && <span className="search-row-d">{h.e.d}</span>}
              </a>
            ))}
          </div>
          {g.list.length > GROUP_CAP && (
            <p className="search-note">仅显示前 {GROUP_CAP} 条，请输入更完整的关键词缩小范围。</p>
          )}
        </section>
      ))}
      {total === 0 && (
        <p className="search-status">没有找到与“{q}”相关的内容。可以换个说法试试：村名、房支名、姓名、谱书名、堂号，或者恩平原书的页码数字。</p>
      )}
    </>
  );
}
