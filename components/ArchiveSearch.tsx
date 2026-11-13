'use client';
import { useState } from 'react';
import index from '../data/search-index.json';
import archives from '../data/archives.json';

export default function ArchiveSearch({ archiveId }: { archiveId: string }) {
  const [q, setQ] = useState('');
  const norm = (s: string) => s.normalize('NFKC').replaceAll('馮', '冯').trim();
  const qc = norm(q).replace(/\s+/g, '').toLowerCase();
  const idm = /^p?(\d+)$/.exec(qc);
  const idNum = idm ? parseInt(idm[1], 10) : null;
  const title = archives.find((a) => a.id === archiveId)?.title || '';
  const results = q
    ? index.filter(
        (p) =>
          p.archiveIds.includes(archiveId) &&
          (idNum !== null ? parseInt(p.id.slice(1), 10) === idNum : p.names.some((n) => norm(n).includes(norm(q)))),
      )
    : [];
  return (
    <section aria-label="在本档案中查姓名">
      <h2>在本档案中查姓名</h2>
      <form className="archive-search" onSubmit={(e) => e.preventDefault()}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="输入姓名或编号" aria-label="输入姓名或编号" />
        <button type="submit">搜索</button>
      </form>
      {q && <p role="status">在{title}中找到 {results.length} 条记录</p>}
      {q &&
        results.slice(0, 50).map((p) => (
          <article key={p.id}>
            <h3><a href={`/persons/${p.id}/`}>{p.originalName}</a></h3>
            <p>{p.id} · 来源谱页见详情</p>
          </article>
        ))}
      {q && results.length > 50 && <p>结果较多，只显示前 50 条，请多输入一个字缩小范围。</p>}
      {q && !results.length && <p>本档案中暂无匹配记录。请尝试少输入一个字。</p>}
    </section>
  );
}
