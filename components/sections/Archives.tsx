import SiteLink from '../SiteLink';
import { genealogyCollections, genealogySites } from '../../lib/places';

const totalPages = Math.max(1, ...genealogyCollections.map((c) => c.page ?? 1));

function pageHref(page: number) {
  return page <= 1 ? '/archives/' : `/archives/zp${page}/`;
}

export default function ArchiveList({ page = 1 }: { page?: number }) {
  const collections = genealogyCollections.filter((c) => (c.page ?? 1) === page);
  return (
    <>
      {page === 1 &&
        genealogySites.map((site) => (
          <article key={site.slug}>
            <h2><SiteLink href={site.url}>{site.title}</SiteLink></h2>
            <p>{site.description}</p>
          </article>
        ))}
      {collections.map((collection) => (
        <article key={collection.url}>
          <h2><SiteLink href={collection.url}>{collection.title}</SiteLink></h2>
          <p>{collection.description}</p>
        </article>
      ))}
      {totalPages > 1 && (
        <nav className="archives-pager" aria-label="分页">
          {page > 1 && <SiteLink href={pageHref(page - 1)}>‹ 上一页</SiteLink>}
          <span>第 {page} 页 / 共 {totalPages} 页</span>
          {page < totalPages && <SiteLink href={pageHref(page + 1)}>下一页 ›</SiteLink>}
        </nav>
      )}
    </>
  );
}
