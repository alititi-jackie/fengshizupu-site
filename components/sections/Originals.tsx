import { archives, pages } from '../../lib/data';

// /originals/ 第一级（原谱档案）：只列档案入口，不直接显示原图
export function OriginalsIndex() {
  return (
    <>
      {archives.map((a) => (
        <article key={a.id}>
          <h2><a href={`/originals/${a.id}/`}>{a.title}</a></h2>
          <p>共 {pages.filter((p) => p.archiveId === a.id).length} 张原图，点入查看。</p>
        </article>
      ))}
    </>
  );
}

// /originals/<档案号>/ 第二级：该档案的全部原图
export function OriginalsArchive({ id }: { id: string }) {
  const a = archives.find((x) => x.id === id)!;
  return (
    <section>
      <div className="grid">
        {pages.filter((p) => p.archiveId === a.id).map((p) => (
          <a className="card" key={p.id} href={p.imagePath}>
            <img src={`/archives/${a.id}/derived/${p.id}-thumb.jpg`} alt={`原图第${p.sequence}张预览`} loading="lazy" width="240" height="320" />
            第 {p.sequence} 张 · 原印 {p.printedPageLabel}
          </a>
        ))}
      </div>
    </section>
  );
}
