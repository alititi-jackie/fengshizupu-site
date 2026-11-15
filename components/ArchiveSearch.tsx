'use client';
import { SearchField, SearchSubmit } from './SearchField';
import { useState } from 'react';
import PersonSearchResult from './PersonSearchResult';
import { searchPeople } from '../lib/person-search';
import archives from '../data/archives.json';

export default function ArchiveSearch({ archiveId, showHeading = true }: { archiveId: string; showHeading?: boolean }) {
  const [q, setQ] = useState('');
  const title = archives.find((a) => a.id === archiveId)?.title || '';
  const results = q.trim() ? searchPeople(q, archiveId) : [];
  return (
    <section aria-label="在本档案中查姓名">
      {showHeading && <h2>在本档案中查姓名</h2>}
      <form className="archive-search" onSubmit={(e) => e.preventDefault()}>
        <SearchField value={q} onChange={(e) => setQ(e.target.value)} placeholder="输入姓名或编号" aria-label="输入姓名或编号" />
        <SearchSubmit />
      </form>
      {q && <p role="status">在{title}中找到 {results.length} 条记录</p>}
      {q &&
        results.slice(0, 50).map((p) => (
          <PersonSearchResult key={p.id} id={p.id} name={p.originalName} archiveId={archiveId} />
        ))}
      {q && results.length > 50 && <p>结果较多，只显示前 50 条，请多输入一个字缩小范围。</p>}
      {q && !results.length && <p>本档案中暂无匹配记录。请尝试少输入一个字。</p>}
    </section>
  );
}
