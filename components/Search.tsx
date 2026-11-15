'use client';
import { useEffect, useState } from 'react';
import index from '../data/search-index.json';
import archives from '../data/archives.json';
import PersonSearchResult from './PersonSearchResult';
import PlaceSearchResults, { findPlaces } from './PlaceSearchResults';

export default function Search() {
  const [query, setQuery] = useState('');
  const [archive, setArchive] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') || '');
    setArchive(params.get('archive') || '');
  }, []);
  const norm = (value: string) => value.normalize('NFKC').replaceAll('馮', '冯').trim();
  const q = norm(query);
  const id = /^p?(\d+)$/.exec(q.replace(/\s+/g, '').toLowerCase());
  const people = index.filter((person) =>
    (!archive || person.archiveIds.includes(archive)) &&
    (!q || (id ? Number(person.id.slice(1)) === Number(id[1]) : person.names.some((name) => norm(name).includes(q)))),
  );
  const places = findPlaces(query);
  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams({ q: query.trim() });
        if (archive) params.set('archive', archive);
        history.replaceState(null, '', `?${params}`);
      }}>
        <input id="q" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="输入姓名、村名、地名、房名或编号" placeholder="输入姓名、村名、房名或编号" />
        <label htmlFor="archive">人物来源</label>
        <select id="archive" value={archive} onChange={(event) => setArchive(event.target.value)}>
          <option value="">全部档案</option>
          {archives.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
        </select>
        <button>搜索</button>
      </form>
      <p><a href={`https://enping.fengshizupu.com/?q=${encodeURIComponent(query.trim())}`} target="_blank" rel="noopener noreferrer">去恩平冯氏族谱查找</a></p>
      <PlaceSearchResults results={places} />
      {people.length > 0 && <section>
        <h2>人物</h2>
        <p role="status">找到 {people.length} 条人物记录</p>
        {people.map((person) => <PersonSearchResult key={person.id} id={person.id} name={person.originalName} archiveId={archive} />)}
      </section>}
      {!people.length && !places.places.length && !places.books.length && <div role="status">
        <p>暂未找到相关记录。可以试试输入部分姓名、村名或房名，也可以到<a href="/archives/">族谱档案</a>中查阅原谱。</p>
        <small>搜索结果以本站已录入的资料为准。</small>
      </div>}
    </>
  );
}
