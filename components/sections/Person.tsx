import { persons } from '../../lib/data';
import { personOrigins } from '../../lib/person-origins';
import FamilyTree from '../FamilyTree';

export default function Person({ id }: { id: string }) {
  const p = persons.find((x) => x.id === id)!;
  const origins = personOrigins(id);
  const archives = [...new Map(origins.map(({ archive }) => [archive.id, archive])).values()];
  return (
    <>
      <article>
        <h2>{p.originalName}</h2>
        {archives.length > 0 && <p>收录档案：{archives.map((archive, i) => <span key={archive.id}>{i > 0 && '、'}<a href={`/archives/${archive.id}/`}>{archive.title}</a></span>)}</p>}
        <p>编号：{p.id}{p.generationNumber ? ` · 世代：第 ${p.generationNumber} 世` : ''}</p>
        <p>{p.notes}</p>
        <h2>原谱依据</h2>
        {origins.map(({ source, page, href }) => (
          <p key={href}>
            <a href={href}>查看第 {page.sequence} 张谱页</a> · 转写：{source.transcription}
          </p>
        ))}
      </article>
      <h2>祖先关系</h2>
      <FamilyTree id={p.id} direction="ancestors" />
      <h2>后代关系</h2>
      <FamilyTree id={p.id} direction="descendants" />
    </>
  );
}
