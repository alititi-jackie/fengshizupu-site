import { notFound } from 'next/navigation';
import { pages, persons, archives, regions, routes } from '../../lib/data';
import Search from '../../components/Search';
import Home from '../../components/sections/Home';
import About from '../../components/sections/About';
import { RegionsIndex, RegionDetail } from '../../components/sections/Regions';
import Village from '../../components/sections/Village';
import Person from '../../components/sections/Person';
import { ArchiveList, ArchiveCatalog, ArchivePageDetail } from '../../components/sections/Archives';
import { RawIndex, RawArchive } from '../../components/sections/Raw';

type Props = { params: Promise<{ path?: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return routes().map((r) => ({ path: r === '/' ? [] : r.split('/').filter(Boolean) }));
}

function title(path: string[]) {
  if (!path.length) return '寻根有据，世系有源';
  if (path[0] === 'persons') return persons.find((x) => x.id === path[1])?.originalName || '人物';
  if (path[0] === 'regions' && path[1]) return regions.find((x) => x.id === path[1])?.name || '地区目录';
  if (path[0] === 'raw' && path[1]) return `${archives.find((x) => x.id === path[1])?.title || ''} · 原图`;
  if (path.length === 4) return `谱页 ${pages.find((x) => x.id === path[3])?.sequence || ''}`;
  return ({ regions: '地区目录', search: '姓名搜索', archives: '族谱档案', villages: '村庄资料', about: '关于冯氏族谱', raw: '原图' } as Record<string, string>)[path[0]] || '冯氏族谱';
}

export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  const t = title(path);
  const url = '/' + (path.length ? path.join('/') + '/' : '');
  const home = !path.length;
  const fullTitle = home ? '冯氏族谱 · 寻根有据，世系有源' : t + ' · 冯氏族谱';
  return {
    title: home ? { absolute: fullTitle } : t,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, url, locale: 'zh_CN', type: 'website', images: [{ url: '/og-logo.png', width: 512, height: 512, alt: '冯氏族谱' }] },
    twitter: { card: 'summary', title: fullTitle, images: ['/og-logo.png'] },
    ...(path[0] === 'persons' && persons.find((x) => x.id === path[1])?.verification !== 'verified' ? { robots: { index: false, follow: true } } : {}),
    ...(path[0] === 'raw' ? { robots: { index: false, follow: false } } : {}),
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
  else if (path[0] === 'regions' && path.length === 1) content = <RegionsIndex />;
  else if (path[0] === 'regions') content = <RegionDetail id={path[1]} />;
  else if (path[0] === 'villages') content = <Village id={path[1]} />;
  else if (path[0] === 'persons') content = <Person id={path[1]} />;
  else if (path.length === 4) content = <ArchivePageDetail id={path[3]} />;
  else if (path[0] === 'raw' && path.length === 1) content = <RawIndex />;
  else if (path[0] === 'raw') content = <RawArchive id={path[1]} />;
  else if (path.length === 1) content = <ArchiveList />;
  else content = <ArchiveCatalog id={path[1]} />;
  return (
    <>
      {path.length > 0 && (
        <>
          <p className="crumb"><a href="/">首页</a> / {title(path)}</p>
          <h1>{title(path)}</h1>
        </>
      )}
      {content}
    </>
  );
}
