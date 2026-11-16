import { ENPING_URL } from '../lib/places';
import { SearchField, SearchSubmit } from './SearchField';

export default function EnpingSearch() {
  return (
    <div className="enping-search">
      <form className="hero-search" action={ENPING_URL} method="get" target="_blank" rel="noopener"
        aria-label="搜索恩平族谱" aria-describedby="enping-search-scope">
        <SearchField name="q" placeholder="搜索恩平族谱：输入村名、房支、姓名或书页码" required />
        <SearchSubmit />
      </form>
      <small id="enping-search-scope">目前仅支持搜索恩平冯氏族谱，结果在新窗口打开。</small>
    </div>
  );
}
