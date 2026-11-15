import ArchivePageCard from '../ArchivePageCard';
import { archives, pages, persons, sources, villages, pageUrl, bookIndexPages } from '../../lib/data';
import PageImage from '../PageImage';
import ArchiveSearch from '../ArchiveSearch';
import BookReader, { type BookItem } from '../BookReader';

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
      <p className="notice">本档案共 {list.length} 页，为按原谱版式重排的图式页。点开任意一页可放大查看、下载单页 PDF；整版可在线阅览，也可下载整版 PDF 一次看全册。</p>
      <p className="controls"><a className="button" href={`/archives/${a.id}/read/`}>整版阅览</a><a className="button" href={`/archives/${a.id}/book.pdf`} download>下载整版 PDF</a></p>
      <p>
        {a.villageIds.map((vid) => (
          <a key={vid} href={`/villages/${vid}/`}>查看村庄资料：{villages.find((v) => v.id === vid)?.name} </a>
        ))}
      </p>
      <ArchiveSearch archiveId={a.id} />
      <div className="grid">
        {list.map((p) => (
          <ArchivePageCard key={p.id} href={pageUrl(p.id, a.id)} src={`/archives/${a.id}/typeset/${p.id}.jpg`}
            alt={`谱页第${p.sequence}张预览`} sequence={p.sequence} printedPage={p.printedPageLabel} pageId={p.id} />
        ))}
      </div>
      <p><a href={`/originals/${a.id}/`}>原谱档案 →</a></p>
    </>
  );
}

export function ArchiveReader({ id }: { id: string }) {
  const a = archives.find((x) => x.id === id)!;
  const list = pages.filter((p) => p.archiveId === a.id);
  const indexCount = bookIndexPages[a.id] || 0;
  const items: BookItem[] = [
    { src: `/archives/${a.id}/bookpages/cover.webp`, label: '封面', alt: `${a.title}族谱封面` },
    { src: `/archives/${a.id}/bookpages/fanli.webp`, label: '凡例', alt: `${a.title}族谱凡例` },
    ...list.map((p) => ({
      src: `/archives/${a.id}/typeset/${p.id}.jpg`,
      label: `世系图第 ${p.sequence} 张 · 原印 ${p.printedPageLabel}`,
      alt: `${p.chartHeader}世系图（谱页第 ${p.sequence} 张）`,
    })),
    ...Array.from({ length: indexCount }, (_, i) => ({
      src: `/archives/${a.id}/bookpages/index-${i + 1}.webp`,
      label: `全名索引（${i + 1}/${indexCount}）`,
      alt: `${a.title}全名索引第 ${i + 1} 页`,
    })),
  ];
  return (
    <>
      <p className="notice">
        《{a.title}》整版阅览：全书共 {items.length} 页（封面、凡例、图式谱页 {list.length} 页、全名索引）。单页模式逐页翻看，连看模式一卷到底；也可
        <a href={`/archives/${a.id}/book.pdf`} download>下载整版 PDF</a>离线阅读。
      </p>
      <BookReader archiveId={a.id} items={items} />
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
      <PageImage src={`/archives/${p.archiveId}/typeset/${p.id}.jpg`} alt={`冯氏族谱影像第${p.sequence}张`} caption={`冯氏族谱影像第${p.sequence}张`} />
      <p><a className="button" href={`/archives/${p.archiveId}/typeset/${p.id}.pdf`} download>下载本页 PDF</a></p>
      <h2>本页已录人物</h2>
      {sources.filter((s) => s.archivePageId === p.id).map((s) => (
        <p key={s.personId}><a href={`/persons/${s.personId}/`}>{persons.find((x) => x.id === s.personId)?.originalName}</a></p>
      ))}
      {!sources.some((s) => s.archivePageId === p.id) && <p>本页尚未完成逐字转写，请直接查阅原图。</p>}
    </>
  );
}
