import { categoryPath, NEWS, newsCategories, newsPath, NEWS_INDEX } from '../lib/news';

export const dynamic = 'force-static';

export default function sitemap() {
  return ['/', '/archives/', '/archives/zp2/', '/about/', '/enping-fengshi-juanshou/', NEWS_INDEX.href,
    ...newsCategories.map(({ slug }) => categoryPath(slug)), ...NEWS.map(newsPath)]
    .map((path) => ({ url: 'https://fengshizupu.com' + path }));
}
