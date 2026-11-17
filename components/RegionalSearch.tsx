import type { GenealogySite } from '../lib/places';
import { SearchField, SearchSubmit } from './SearchField';

// 全站统一搜索：提交到主站 /search/，一次搜恩平原书、新谱人物、各地收藏谱与本站资讯。
// site 参数保留兼容原有调用点（首页与资讯文章页），不再按站分开搜。
export default function RegionalSearch({ home = false }: { site?: GenealogySite; home?: boolean }) {
  return (
    <div className="regional-search">
      <form className="hero-search" action="/search/" method="get"
        aria-label="搜索全站族谱" aria-describedby={home ? "regional-search-scope" : undefined}>
        <SearchField name="q" placeholder="搜索全站族谱：输入村名、房支、姓名、谱书名或书页码" required />
        <SearchSubmit />
      </form>
      {home && <small id="regional-search-scope">可搜恩平原书、新谱人物、各地收藏谱与本站资讯。</small>}
    </div>
  );
}
