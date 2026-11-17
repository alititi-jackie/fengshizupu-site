import type { ComponentProps } from 'react';

const siteOrigin = 'https://fengshizupu.com';

export default function SiteLink({ href, ...props }: ComponentProps<'a'> & { href: string }) {
  const url = new URL(href, siteOrigin);
  const ownSite = url.hostname === 'fengshizupu.com' || url.hostname === 'zp1.fengshizupu.com' || url.hostname === 'zp2.fengshizupu.com';
  const external = (url.protocol === 'https:' || url.protocol === 'http:') && !ownSite;
  return <a {...props} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />;
}
