'use client';
import { SearchField, SearchSubmit } from './SearchField';
import { useState } from 'react';
import PlaceSearchResults, { findPlaces } from './PlaceSearchResults';

export default function RegionSearch() {
  const [query, setQuery] = useState('');
  const results = findPlaces(query);
  return (
    <>
      <form className="archive-search" onSubmit={(event) => event.preventDefault()}>
        <SearchField aria-label="输入村名、地名或房名" placeholder="输入村名、地名或房名" value={query} onChange={(event) => setQuery(event.target.value)} />
        <SearchSubmit />
      </form>
      <PlaceSearchResults results={results} />
      {query.trim() && !results.places.length && !results.books.length && <p role="status">暂无匹配的地区、村庄或档案。</p>}
    </>
  );
}
