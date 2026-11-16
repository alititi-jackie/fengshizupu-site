import type { GenealogySite } from '../lib/places';
import { SearchField, SearchSubmit } from './SearchField';

export default function RegionalSearch({ site, home = false }: { site: GenealogySite; home?: boolean }) {
  const label = `搜索${site.place}族谱`;
  return (
    <div className="regional-search">
      <form className="hero-search" action={site.search.url} method="get" target="_blank" rel="noopener"
        aria-label={label} aria-describedby="regional-search-scope">
        <SearchField name={site.search.param} placeholder={`${label}：${site.search.hint}`} required />
        <SearchSubmit />
      </form>
      <small id="regional-search-scope">{home ? `目前仅支持搜索${site.title}，` : ''}结果在新窗口打开。</small>
    </div>
  );
}
