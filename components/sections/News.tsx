import GuideEnping from './Guide';

export type NewsItem = { slug: string; title: string; date: string; tag: string; summary: string };

export const NEWS: NewsItem[] = [
  {
    slug: 'enping-feng-roots',
    title: '恩平冯氏寻根指南',
    date: '2026-11-13',
    tag: '指南',
    summary: '从南雄珠玑巷到良西镇小湴村：先定村与房，再查目录与全文——广东冯氏源流、公开族谱目录概况，以及小湴村凝斋房在本站的三步查法。',
  },
];

function fmtDate(d: string) {
  const [y, m, dd] = d.split('-');
  return `${y} 年 ${Number(m)} 月 ${Number(dd)} 日`;
}

export function NewsIndex() {
  return (
    <>
      <p>冯氏宗亲新闻、本站动态与寻根指南汇集于此：宗亲活动与冯氏相关消息标「新闻」，本站新收录、新功能与更正说明标「动态」，长效的查谱方法与族谱知识标「指南」。</p>
      {NEWS.map((n) => (
        <article key={n.slug}>
          <p><span className="badge">{n.tag}</span> <small>{fmtDate(n.date)}</small></p>
          <h2><a href={`/news/${n.slug}/`}>{n.title}</a></h2>
          <p>{n.summary}</p>
        </article>
      ))}
    </>
  );
}

export function NewsArticle({ slug }: { slug: string }) {
  const n = NEWS.find((x) => x.slug === slug);
  return (
    <>
      {n && (
        <p><span className="badge">{n.tag}</span> <small>{fmtDate(n.date)}</small></p>
      )}
      {slug === 'enping-feng-roots' ? <GuideEnping /> : null}
    </>
  );
}
