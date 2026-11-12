import { persons, sources, pageUrl } from '../../lib/data';
import FamilyTree from '../FamilyTree';

export default function Person({ id }: { id: string }) {
  const p = persons.find((x) => x.id === id)!;
  return (
    <>
      <article>
        <h2>{p.originalName}</h2>
        <p>编号：{p.id}{p.generationNumber ? ` · 世代：第 ${p.generationNumber} 世` : ''}</p>
        <p>{p.notes}</p>
        <h2>原谱依据</h2>
        {sources.filter((s) => s.personId === p.id).map((s) => (
          <p key={s.archivePageId}>
            <a href={pageUrl(s.archivePageId)}>打开来源谱页</a> · 转写：{s.transcription}
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
