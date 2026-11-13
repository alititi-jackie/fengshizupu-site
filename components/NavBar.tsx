'use client';
import { usePathname } from 'next/navigation';
import ShareButton from './ShareButton';

const LINKS: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: '/', label: '首页', match: (p) => p === '/' },
  { href: '/search/', label: '搜索', match: (p) => p.startsWith('/search') || p.startsWith('/persons') },
  { href: '/archives/', label: '档案', match: (p) => p.startsWith('/archives') || p.startsWith('/originals') },
  { href: '/news/', label: '资讯', match: (p) => p.startsWith('/news') },
  { href: '/regions/', label: '地区', match: (p) => p.startsWith('/regions') || p.startsWith('/villages') },
  { href: '/about/', label: '关于', match: (p) => p.startsWith('/about') },
];

export default function NavBar() {
  const pathname = usePathname() || '/';
  return (
    <nav className="mainnav" aria-label="主导航">
      <div className="mainnav-in">
        {LINKS.map((l) => {
          const on = l.match(pathname);
          return (
            <a key={l.href} href={l.href} className={on ? 'on' : undefined} aria-current={on ? 'page' : undefined}>
              {l.label}
            </a>
          );
        })}
        <ShareButton />
      </div>
    </nav>
  );
}
