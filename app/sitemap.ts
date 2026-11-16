import { categoryPath, NEWS, newsCategories, newsPath, NEWS_INDEX } from '../lib/news';

export const dynamic = 'force-static';

export default function sitemap() {
  return ['/', '/archives/', '/about/', '/enping-fengshi-juanshou/', NEWS_INDEX.href,
    ...newsCategories.map(({ slug }) => categoryPath(slug)), ...NEWS.map(newsPath)]
    .map((path) => ({ url: 'https://fengshizupu.com' + path }));
}
