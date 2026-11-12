import { villages, regions, archives } from '../../lib/data';

export default function Village({ id }: { id: string }) {
  const v = villages.find((x) => x.id === id)!;
  const sections = (v as { sections?: { heading: string; body: string }[] }).sections;
  const chain: typeof regions = [];
  let c: string | null | undefined = (v.regionIds || [])[0];
  const seen = new Set<string>();
  while (c && !seen.has(c)) {
    seen.add(c);
    const rr = regions.find((x) => x.id === c);
    if (!rr) break;
    chain.unshift(rr);
    c = rr.parentId;
  }
  return (
    <article>
      <h2>{v.name}</h2>
      <p>{v.description}</p>
      {sections?.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          <p>{s.body}</p>
        </section>
      ))}
      <p>编号：{v.id}</p>
      {(v.regionIds || []).length > 0 && (
        <p>所属地区：{chain.map((rr, i) => (
          <span key={rr.id}>{i > 0 ? ' / ' : ''}<a href={`/regions/${rr.id}/`}>{rr.name}</a></span>
        ))}</p>
      )}
      <h2>关联族谱</h2>
      {archives.filter((a) => a.villageIds.includes(v.id)).map((a) => (
        <p key={a.id}><a href={`/archives/${a.id}/`}>{a.title}</a></p>
      ))}
    </article>
  );
}
