import type { ComponentProps } from 'react';

const siteOrigin = 'https://fengshizupu.com';

export default function SiteLink({ href, ...props }: ComponentProps<'a'> & { href: string }) {
  const url = new URL(href, siteOrigin);
  const external = (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname !== 'fengshizupu.com';
  return <a {...props} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />;
}
