import type { GenealogySite } from '../lib/places';
import { SearchField, SearchSubmit } from './SearchField';

export default function RegionalSearch({ site, home = false }: { site: GenealogySite; home?: boolean }) {
  const label = `搜索${site.place}族谱`;
  return (
    <div className="regional-search">
      <form className="hero-search" action={site.search.url} method="get" target="_blank" rel="noopener"
        aria-label={label} aria-describedby={home ? "regional-search-scope" : undefined}>
        <SearchField name={site.search.param} placeholder={`${label}：${site.search.hint}`} required />
        <SearchSubmit />
      </form>
      {home && <small id="regional-search-scope">目前暂仅支持搜索恩平冯氏族谱。</small>}
    </div>
  );
}
