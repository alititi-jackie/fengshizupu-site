import { regions, villages } from '../../lib/data';

export function RegionsIndex() {
  const unassigned = villages.filter((v) => !(v.regionIds || []).length);
  return (
    <>
      <div className="grid">
        {regions.filter((r) => !r.parentId).map((r) => (
          <article key={r.id}>
            <h2><a href={`/regions/${r.id}/`}>{r.name}</a></h2>
            <p>{r.description}</p>
          </article>
        ))}
      </div>
      {unassigned.length > 0 && (
        <>
          <h2>其他收录村庄</h2>
          {unassigned.map((v) => (
            <p key={v.id}><a href={`/villages/${v.id}/`}>{v.name}</a></p>
          ))}
        </>
      )}
    </>
  );
}

export function RegionDetail({ id }: { id: string }) {
  const r = regions.find((x) => x.id === id)!;
  const chain: typeof regions = [];
  let c = r.parentId;
  while (c) {
    const pr = regions.find((x) => x.id === c);
    if (!pr) break;
    chain.unshift(pr);
    c = pr.parentId;
  }
  const desc = new Set([r.id]);
  const queue = [r.id];
  while (queue.length) {
    const cur = queue.pop()!;
    regions.filter((x) => x.parentId === cur).forEach((x) => { desc.add(x.id); queue.push(x.id); });
  }
  const kids = regions.filter((x) => x.parentId === r.id);
  const vs = villages.filter((v) => (v.regionIds || []).some((x) => desc.has(x)));
  return (
    <article>
      <h2>{r.name}</h2>
      <p>{r.description}</p>
      {chain.length > 0 && (
        <p>上级地区：{chain.map((cc, i) => (
          <span key={cc.id}>{i > 0 ? ' / ' : ''}<a href={`/regions/${cc.id}/`}>{cc.name}</a></span>
        ))}</p>
      )}
      {kids.length > 0 && (
        <>
          <h2>下辖地区</h2>
          {kids.map((k) => (
            <p key={k.id}><a href={`/regions/${k.id}/`}>{k.name}</a></p>
          ))}
        </>
      )}
      {vs.length > 0 && (
        <>
          <h2>收录村庄</h2>
          {vs.map((v) => (
            <p key={v.id}><a href={`/villages/${v.id}/`}>{v.name}</a></p>
          ))}
        </>
      )}
    </article>
  );
}
