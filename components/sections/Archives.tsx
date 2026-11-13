import { archives, pages, persons, sources, villages, pageUrl } from '../../lib/data';
import Viewer from '../Viewer';
import ArchiveSearch from '../ArchiveSearch';

export function ArchiveList() {
  return (
    <>
      {archives.map((a) => (
        <article key={a.id}>
          <h2><a href={`/archives/${a.id}/`}>{a.title}</a></h2>
          <p>{a.source}</p>
        </article>
      ))}
    </>
  );
}

export function ArchiveCatalog({ id }: { id: string }) {
  const a = archives.find((x) => x.id === id)!;
  const list = pages.filter((p) => p.archiveId === a.id);
  return (
    <>
      <p>{a.source}</p>
      <p className="notice">本档案共 {list.length} 页，为按原谱版式重排的图式页。点开任意一页可放大查看、下载单页 PDF；整版 PDF 可一次下载全册。</p>
      <p><a className="button" href={`/archives/${a.id}/book.pdf`} target="_blank" rel="noopener noreferrer">查看整版 PDF</a></p>
      <p>
        {a.villageIds.map((vid) => (
          <a key={vid} href={`/villages/${vid}/`}>查看村庄资料：{villages.find((v) => v.id === vid)?.name} </a>
        ))}
      </p>
      <ArchiveSearch archiveId={a.id} />
      <div className="grid">
        {list.map((p) => (
          <a className="card" key={p.id} href={pageUrl(p.id, a.id)}>
            <img src={`/archives/${a.id}/typeset/${p.id}.jpg`} alt={`谱页第${p.sequence}张预览`} loading="lazy" width="240" height="320" />
            第 {p.sequence} 张 · 原印 {p.printedPageLabel}
            <small style={{ display: 'block' }}>{p.id}</small>
          </a>
        ))}
      </div>
      <p><a href={`/originals/${a.id}/`}>原谱档案 →</a></p>
    </>
  );
}

export function ArchivePageDetail({ id }: { id: string }) {
  const p = pages.find((x) => x.id === id)!;
  const siblings = pages.filter((x) => x.archiveId === p.archiveId);
  const n = siblings.findIndex((x) => x.id === p.id);
  return (
    <>
      <p>影像序号 {p.sequence} / {siblings.length} · 原印页码：{p.printedPageLabel}</p>
      <div className="controls">
        {n > 0 && <a href={pageUrl(siblings[n - 1].id)}>← 上一张</a>}
        <a href={`/archives/${p.archiveId}/`}>页码目录</a>
        {n < siblings.length - 1 && <a href={pageUrl(siblings[n + 1].id)}>下一张 →</a>}
      </div>
      <Viewer src={`/archives/${p.archiveId}/typeset/${p.id}.jpg`} title={`冯氏族谱影像第${p.sequence}张`} />
      <p><a className="button" href={`/archives/${p.archiveId}/typeset/${p.id}.pdf`} download>下载本页 PDF</a></p>
      <h2>本页已录人物</h2>
      {sources.filter((s) => s.archivePageId === p.id).map((s) => (
        <p key={s.personId}><a href={`/persons/${s.personId}/`}>{persons.find((x) => x.id === s.personId)?.originalName}</a></p>
      ))}
      {!sources.some((s) => s.archivePageId === p.id) && <p>本页尚未完成逐字转写，请直接查阅原图。</p>}
    </>
  );
}
