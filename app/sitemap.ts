import { routes } from '../lib/data';
import { NEWS } from '../lib/news';

export const dynamic = "force-static";

export default function sitemap() {
  const oldNews = new Set(NEWS.map(({ slug }) => `/news/${slug}/`));
  return routes().filter((path) => !path.startsWith('/originals') && !oldNews.has(path))
    .map((path) => ({ url: 'https://fengshizupu.com' + path }));
}
