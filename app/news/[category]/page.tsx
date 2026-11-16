import { notFound } from 'next/navigation';
import PageHeading from '../../../components/PageHeading';
import { NewsIndex } from '../../../components/sections/News';
import { categoryPath, legacyNews, newsCategories, newsPath, NEWS_INDEX } from '../../../lib/news';
import { pageMetadata } from '../../../lib/metadata';

type Props = { params: Promise<{ category: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return [...newsCategories.map(({ slug }) => ({ category: slug })),
    ...Object.keys(legacyNews).map((slug) => ({ category: slug }))];
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const group = newsCategories.find(({ slug }) => slug === category);
  if (group) return pageMetadata(group.title, `查阅${group.title}，了解冯氏宗亲动态、族谱资料和寻根方法。`, categoryPath(group.slug));
  const article = legacyNews[category];
  if (!article) notFound();
  return { ...pageMetadata(article.title, article.summary, newsPath(article)), robots: { index: false, follow: true } };
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params;
  const group = newsCategories.find(({ slug }) => slug === category);
  if (group) return <><PageHeading title={group.title} parents={[NEWS_INDEX]} /><NewsIndex category={group.slug} /></>;
  const article = legacyNews[category];
  if (!article) notFound();
  const href = newsPath(article);
  return <><meta httpEquiv="refresh" content={`0; url=${href}`} /><p>文章已移至<a href={href}>{article.title}</a>。</p></>;
}
