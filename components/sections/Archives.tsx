import SiteLink from '../SiteLink';
import { genealogyCollections, genealogySites } from '../../lib/places';

export default function ArchiveList() {
  return (
    <>
      {genealogySites.map((site) => (
        <article key={site.slug}>
          <h2><SiteLink href={site.url}>{site.title}</SiteLink></h2>
          <p>{site.description}</p>
        </article>
      ))}
      {genealogyCollections.map((collection) => (
        <article key={collection.url}>
          <h2><SiteLink href={collection.url}>{collection.title}</SiteLink></h2>
          <p>{collection.description}</p>
        </article>
      ))}
    </>
  );
}
