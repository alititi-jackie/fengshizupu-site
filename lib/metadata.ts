import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, canonical: string): Metadata {
  const fullTitle = canonical === '/' ? '冯氏族谱 · ' + title : title + ' · 冯氏族谱';
  return {
    title: canonical === '/' ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle, description, url: canonical, locale: 'zh_CN', type: 'website',
      images: [{ url: '/og-logo.png', width: 512, height: 512, alt: '冯氏族谱' }],
    },
    twitter: { card: 'summary', title: fullTitle, description, images: ['/og-logo.png'] },
  };
}
