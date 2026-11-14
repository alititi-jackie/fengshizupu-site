import GuideEnping from './Guide';

export type NewsItem = { slug: string; title: string; date: string; tag: string; summary: string };

export const NEWS: NewsItem[] = [
  {
    slug: 'feng-surname-origin',
    title: '冯姓的来源：从毕公高到冯城得姓',
    date: '2026-11-14',
    tag: '指南',
    summary: '冯姓有两个并列的源头：姬姓一支由毕公高、毕万而下，支孙冯文孙受封冯城、以邑为氏；归姓一支始于郑大夫冯简子。附订正版冯氏来源简图，并说清冯奉世、冯异两汉望族与始平、上党、颍川等郡望的出处。',
  },
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

function ArticleFengOrigin() {
  return (
    <article>
      <p>网上流传不少「冯氏来源」图，有的把不同源头、不同支系的人物排成一条直线，容易看混。本站据《元和姓纂》《通志 · 氏族略》《世本》等姓氏典籍，把冯姓的源流理成四段，并配简图一幅。</p>
      <p><img src="/news/feng-surname-origin.png" alt="冯氏来源简图：姬姓正宗由毕公高、毕万到冯文孙受封冯城以邑为氏；归姓一支始于郑大夫冯简子；两汉望族冯奉世（上党）、冯异（颍川）并列；堂联始平世泽、大树家声" width="1080" height="2068" /></p>
      <h2>一、姬姓正宗：得姓于冯城</h2>
      <p>冯姓的主流源头出于姬姓。周文王第十五子毕公高受封于毕，他的后裔毕万在晋国为大夫，受封魏地，是魏氏的始祖。毕万的一支后孙——姓氏书称冯文孙，又称魏长卿——受封于冯城，子孙以邑为氏，改姓冯。冯城故址，一说在今河南荥阳，一说在今陕西大荔。这一支史称冯氏正宗，冯文孙被后世尊为冯姓的得姓始祖。</p>
      <h2>二、归姓一支：郑大夫冯简子</h2>
      <p>冯姓还有一个源头，见于最早的姓氏典籍《世本》：「冯氏，归姓，郑大夫冯简子之后。」冯简子是春秋时郑国大夫，以善断大事闻名，《左传》里子产说他「能断大事」。他受封冯邑，以邑为氏。归姓一支与姬姓一支是并列的两个源头，两者不是祖孙关系。</p>
      <h2>三、两汉望族：冯奉世与冯异不是一家人</h2>
      <p>汉代冯氏最有名的两支望族，常被误排成一条世系。《元和姓纂》载：冯奉世是西汉名将，本居上党，是上党冯氏的先祖，后徙杜陵；冯异是东汉开国名将，颍川父城人，是颍川冯氏的先祖——诸将争功时他独自避在大树下，人称「大树将军」。冯氏郡望主要有始平、上党、颍川、长乐、京兆、弘农。《恩平冯氏谱》卷首堂联「始平世泽 · 大树家声」，说的正是总郡望始平与大树将军冯异。</p>
      <h2>四、南迁岭南与恩平冯氏</h2>
      <p>汉唐以后，冯氏子孙北迁南徙、遍布各地，其间另有少数民族改姓融入。岭南冯氏多奉南朝冯业为始祖。恩平一带的冯氏世系，可查本站收录的<a href="/enping-fengshi-juanshou.pdf" target="_blank" rel="noopener noreferrer">《恩平冯氏谱 · 卷首影印》</a>与<a href="/archives/a000100/">小湴村凝斋房族谱档案</a>。</p>
      <p>姓氏远源是各支共奉的源头，一房一村的近世世系，仍以自家谱牒为准。查本村人物，可到本站<a href="/archives/a000100/">族谱档案</a>按姓名或编号检索。</p>
    </article>
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
      {slug === 'feng-surname-origin' ? <ArticleFengOrigin /> : null}
    </>
  );
}
