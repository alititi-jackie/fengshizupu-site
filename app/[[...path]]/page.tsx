import { notFound } from 'next/navigation';
import { pages, persons, archives, regions, villages, sources, routes } from '../../lib/data';
import Search from '../../components/Search';
import Home from '../../components/sections/Home';
import About from '../../components/sections/About';
import { NewsIndex, NewsArticle, NEWS } from '../../components/sections/News';
import { RegionsIndex, RegionDetail } from '../../components/sections/Regions';
import Village from '../../components/sections/Village';
import Person from '../../components/sections/Person';
import { ArchiveList, ArchiveCatalog, ArchivePageDetail } from '../../components/sections/Archives';
import { OriginalsIndex, OriginalsArchive, OriginalsChanges } from '../../components/sections/Originals';

type Props = { params: Promise<{ path?: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return routes().map((r) => ({ path: r === '/' ? [] : r.split('/').filter(Boolean) }));
}

function title(path: string[]) {
  if (!path.length) return '寻根有据，世系有源';
  if (path[0] === 'persons') return persons.find((x) => x.id === path[1])?.originalName || '人物';
  if (path[0] === 'regions' && path[1]) return regions.find((x) => x.id === path[1])?.name || '地区目录';
  if (path[0] === 'villages' && path[1]) return villages.find((x) => x.id === path[1])?.name || '村庄资料';
  if (path[0] === 'news') return NEWS.find((x) => x.slug === path[1])?.title || '冯氏资讯';
  if (path[0] === 'archives' && path[1] && path.length === 2) return archives.find((x) => x.id === path[1])?.title || '族谱档案';
  if (path[0] === 'originals' && path[2] === 'changes') return '修改说明';
  if (path[0] === 'originals' && path[1]) return `${archives.find((x) => x.id === path[1])?.title || ''} · 原谱档案`;
  if (path.length === 4) { const pg = pages.find((x) => x.id === path[3]); return pg ? `${pg.chartHeader} · 谱页 ${pg.sequence}` : '谱页'; }
  return ({ regions: '地区目录', search: '姓名搜索', archives: '族谱档案', villages: '村庄资料', about: '关于冯氏族谱', originals: '原谱档案', news: '冯氏资讯' } as Record<string, string>)[path[0]] || '冯氏族谱';
}

function description(path: string[]): string | undefined {
  if (path[0] === 'originals') return undefined;
  if (!path.length) return '面向全国冯氏宗亲的数字族谱档案平台。查阅原谱，寻找姓名，了解世系。';
  if (path[0] === 'persons') {
    const p = persons.find((x) => x.id === path[1]);
    if (!p) return '冯氏族谱人物页：世系关系与原谱出处。';
    const src = sources.find((s) => s.personId === p.id);
    const pg = src ? pages.find((x) => x.id === src.archivePageId) : undefined;
    const gen = p.generationNumber ? `第${p.generationNumber}世` : '世系待考';
    const ctx = pg?.chartHeader ? `，见原谱谱页「${pg.chartHeader}」` : '';
    return `${p.originalName}：冯氏族谱人物页，${gen}${ctx}。含世系、父子关系与原谱出处。`;
  }
  if (path[0] === 'villages' && path[1]) {
    const v = villages.find((x) => x.id === path[1]);
    if (v?.description) return `${v.description}冯氏族谱收录该村世系人物与谱页档案。`;
    return v ? `${v.name}：冯氏族谱收录村庄，含世系人物与谱页档案。` : undefined;
  }
  if (path[0] === 'regions' && path[1]) {
    const r = regions.find((x) => x.id === path[1]);
    if (r?.description) return r.description;
    return r ? `${r.name}：冯氏族谱地区目录，下辖地区、村庄与人物世系。` : undefined;
  }
  if (path[0] === 'regions') return '按省、市、县、镇、村委会逐级浏览冯氏族谱收录的地区与村庄目录。';
  if (path[0] === 'archives' && path[1] && path.length === 2) {
    const a = archives.find((x) => x.id === path[1]);
    if (!a) return undefined;
    const n = pages.filter((x) => x.archiveId === a.id).length;
    return `${a.title}族谱档案：据原谱整理重排的图式谱页共 ${n} 页，可逐页查阅或查看整版 PDF。`;
  }
  if (path[0] === 'archives' && path.length === 4) {
    const pg = pages.find((x) => x.id === path[3]);
    return pg ? `${pg.chartHeader}谱页第 ${pg.sequence} 页（图式重排）：本页世系图含人物姓名与世系关系，可放大查看或下载本页 PDF。` : undefined;
  }
  if (path[0] === 'archives') return '冯氏族谱收录的族谱档案目录：一册谱一个档案，含图式重排谱页与整版 PDF。';
  if (path[0] === 'search') return '按姓名或编号搜索冯氏族谱收录人物：输入姓名，或 p000001 式编号精确查找。';
  if (path[0] === 'news' && path.length === 1) return '冯氏资讯：冯氏宗亲新闻、本站动态与寻根指南——宗亲活动消息、新收录与更正公告、查谱方法与族谱知识。';
  if (path[0] === 'news' && path[1] === 'enping-feng-generations') return '恩平冯氏世系排法：广东总世系从冯业起算与本房世系两套编号并行；总世系主干冯业、大郎公、玄英公、黼公到复春公，复春、万辅、宁邦三大房排列，及复春房朝珍一支（近桂、凝斋）与梨园岳孔房字辈。';
  if (path[0] === 'news' && path[1] === 'feng-surname-origin') return '冯姓的来源：姬姓一支由毕公高、毕万而下，支孙冯文孙受封冯城、以邑为氏；归姓一支始于郑大夫冯简子，两源并列。附订正简图，并考冯奉世、冯异两汉望族与始平、上党、颍川等郡望、堂联出处。';
  if (path[0] === 'news') return '恩平冯氏寻根指南：先定村与房，再查目录与全文——广东冯氏源流、公开族谱目录概况，以及小湴村凝斋房在本站的三步查法。';
  return undefined;
}

export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  const t = title(path);
  const url = '/' + (path.length ? path.join('/') + '/' : '');
  const home = !path.length;
  const fullTitle = home ? '冯氏族谱 · 寻根有据，世系有源' : t + ' · 冯氏族谱';
  const desc = description(path);
  return {
    title: home ? { absolute: fullTitle } : t,
    ...(desc ? { description: desc } : {}),
    alternates: { canonical: url },
    openGraph: { title: fullTitle, ...(desc ? { description: desc } : {}), url, locale: 'zh_CN', type: 'website', images: [{ url: '/og-logo.png', width: 512, height: 512, alt: '冯氏族谱' }] },
    twitter: { card: 'summary', title: fullTitle, images: ['/og-logo.png'] },
    ...(path[0] === 'persons' && persons.find((x) => x.id === path[1])?.verification !== 'verified' ? { robots: { index: false, follow: true } } : {}),
    ...(path[0] === 'originals' ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Page({ params }: Props) {
  const { path = [] } = await params;
  const url = '/' + (path.length ? path.join('/') + '/' : '');
  if (!routes().includes(url)) notFound();
  let content;
  if (!path.length) content = <Home />;
  else if (path[0] === 'search') content = <Search />;
  else if (path[0] === 'about') content = <About />;
  else if (path[0] === 'news' && path.length === 1) content = <NewsIndex />;
  else if (path[0] === 'news') content = <NewsArticle slug={path[1]} />;
  else if (path[0] === 'regions' && path.length === 1) content = <RegionsIndex />;
  else if (path[0] === 'regions') content = <RegionDetail id={path[1]} />;
  else if (path[0] === 'villages') content = <Village id={path[1]} />;
  else if (path[0] === 'persons') content = <Person id={path[1]} />;
  else if (path.length === 4) content = <ArchivePageDetail id={path[3]} />;
  else if (path[0] === 'originals' && path.length === 1) content = <OriginalsIndex />;
  else if (path[0] === 'originals' && path[2] === 'changes') content = <OriginalsChanges id={path[1]} />;
  else if (path[0] === 'originals') content = <OriginalsArchive id={path[1]} />;
  else if (path.length === 1) content = <ArchiveList />;
  else content = <ArchiveCatalog id={path[1]} />;
  return (
    <>
      {path.length > 0 && (
        <>
          <p className="crumb"><a href="/">首页</a> / {path[0] === 'news' && path.length === 2 ? <><a href="/news/">冯氏资讯</a> / </> : null}{title(path)}</p>
          <h1>{title(path)}</h1>
        </>
      )}
      {content}
    </>
  );
}
