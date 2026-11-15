export default function ArchivePageCard({ href, src, alt, sequence, printedPage, pageId }: {
  href: string;
  src: string;
  alt: string;
  sequence: number;
  printedPage: string;
  pageId?: string;
}) {
  return (
    <a className="card" href={href}>
      <img src={src} alt={alt} loading="lazy" width="240" height="320" />
      第 {sequence} 张 · 原印 {printedPage}
      {pageId && <small style={{ display: 'block' }}>{pageId}</small>}
    </a>
  );
}
