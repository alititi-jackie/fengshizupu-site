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

// /originals/<档案号>/changes/ 修改说明：逐条记录网站内容相对原谱的更正，续记于此
const CHANGES: { date: string; items: string[] }[] = [
  {
    date: '2026年11月12日',
    items: [
      '第 2 页：冯婉伃 更正为 冯婉怡。',
      '第 2 页：补录一人——冯细城之女 冯婉仪，排冯婉雯之后（原谱未载，据宗亲提供补入）。',
      '第 4 页：冯小泉之配 吴素琼 更正为 吴苏琼。',
      '第 4 页：冯俊国 更正为 冯柱长。',
      '第 21 页：冯有安之配 黎炳清 更正为 黎炳青。',
      '第 21 页：冯惠超之配 梁礼敏 更正为 梁丽敏。',
      '第 21 页：冯小冰 更正为 冯少冰。',
      '第 21 页：冯小红 更正为 冯少红。',
      '第 22 页：冯悦俊 更正为 冯悦峻。',
    ],
  },
];

export function OriginalsChanges({ id }: { id: string }) {
  const a = archives.find((x) => x.id === id)!;
  return (
    <section>
      <p>本页记录「{a.title}」在网站上相对原谱影像的更正。原谱照片保持原貌，未作任何修改；下列更正已经宗亲核对，同步应用于网站人物资料与重排谱页。日后如再有更正，续记于本页。</p>
      {CHANGES.map((g) => (
        <article key={g.date}>
          <h2>{g.date}</h2>
          {g.items.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </article>
      ))}
      <p><a href={`/originals/${a.id}/`}>← 返回原谱档案</a></p>
    </section>
  );
}

// /originals/<档案号>/ 第二级：该档案的全部原图
export function OriginalsArchive({ id }: { id: string }) {
  const a = archives.find((x) => x.id === id)!;
  return (
    <section>
      <p>本档案原图之后的更正记录见 <a href={`/originals/${a.id}/changes/`}>修改说明</a>。</p>
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
