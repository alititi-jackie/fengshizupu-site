import { personById, personOrigins } from '../lib/person-origins';

export default function PersonSearchResult({ id, name, archiveId }: { id: string; name: string; archiveId?: string }) {
  const generation = personById.get(id)?.generationNumber;
  const origins = personOrigins(id).filter(({ archive }) => !archiveId || archive.id === archiveId);
  return (
    <article>
      <h3><a href={`/persons/${id}/`}>{name}</a></h3>
      <p>{id}{generation ? ` · 第 ${generation} 世` : ''}</p>
      {origins.map(({ archive, page, href }) => (
        <p key={href}><a href={`/archives/${archive.id}/`}>{archive.title}</a> · <a href={href}>查看第 {page.sequence} 张谱页</a></p>
      ))}
    </article>
  );
}
