import type { GenealogySite } from '../lib/places';
import SearchForm from './SearchForm';

// 全站统一搜索：提交到主站 /search/，一次搜恩平原书、新谱人物、各地收藏谱与本站资讯。
// site 参数保留兼容原有调用点（首页与资讯文章页），不再按站分开搜。
export default function RegionalSearch({ home = false }: { site?: GenealogySite; home?: boolean }) {
  return (
    <div className="regional-search">
      <SearchForm describedBy={home ? 'regional-search-scope' : undefined} />
      {home && <small id="regional-search-scope">可搜恩平原书、新谱人物、各地收藏谱与本站资讯。</small>}
    </div>
  );
}
