'use client';
import { SearchField, SearchSubmit, SITE_SEARCH_HINT } from './SearchField';
import { useEffect, useState } from 'react';
import { searchPeople } from '../lib/person-search';
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
  const people = searchPeople(query, archive);
  const places = findPlaces(query);
  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams({ q: query.trim() });
        if (archive) params.set('archive', archive);
        history.replaceState(null, '', `?${params}`);
      }}>
        <SearchField id="q" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="输入姓名、村名、地名、房名或编号" placeholder={SITE_SEARCH_HINT} />
        <label htmlFor="archive">人物来源</label>
        <select id="archive" value={archive} onChange={(event) => setArchive(event.target.value)}>
          <option value="">全部档案</option>
          {archives.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
        </select>
        <SearchSubmit />
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
