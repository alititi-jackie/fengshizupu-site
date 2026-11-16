import { notFound } from 'next/navigation';
import PageHeading from '../../../../components/PageHeading';
import RegionalSearch from '../../../../components/RegionalSearch';
import { NewsArticle } from '../../../../components/sections/News';
import { categoryPath, newsCategories, newsPath, NEWS, NEWS_INDEX } from '../../../../lib/news';
import { genealogySites } from '../../../../lib/places';
import { pageMetadata } from '../../../../lib/metadata';

type Props = { params: Promise<{ category: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.map(({ category, slug }) => ({ category, slug }));
}

async function getArticle({ params }: Props) {
  const { category, slug } = await params;
  const article = NEWS.find((item) => item.category === category && item.slug === slug);
  if (!article) notFound();
  return article;
}

export async function generateMetadata(props: Props) {
  const article = await getArticle(props);
  return pageMetadata(article.title, article.summary, newsPath(article));
}

export default async function NewsArticlePage(props: Props) {
  const article = await getArticle(props);
  const group = newsCategories.find(({ slug }) => slug === article.category);
  if (!group) notFound();
  const site = genealogySites.find(({ slug }) => slug === group.slug);
  return (
    <>
      <PageHeading title={article.title} parents={[NEWS_INDEX, { href: categoryPath(group.slug), label: group.title }]}
        beforeTitle={site && <RegionalSearch site={site} />} />
      <NewsArticle slug={article.slug} />
    </>
  );
}
