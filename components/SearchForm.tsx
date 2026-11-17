import type { ReactNode } from 'react';
import { SearchField, SearchSubmit } from './SearchField';
export const SEARCH_HINT = '搜索全站族谱：输入村名、房支、姓名、谱书名或书页码';
export default function SearchForm({ query, describedBy, children }: { query?: string; describedBy?: string; children?: ReactNode }) {
  return <form className="hero-search" action="/search/" method="get" aria-label="搜索全站族谱" aria-describedby={describedBy}>
    <SearchField name="q" defaultValue={query} placeholder={SEARCH_HINT} required />
    <SearchSubmit />{children}
  </form>;
}
