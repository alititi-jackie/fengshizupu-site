import { fengNews } from './feng-news';
import { genealogySites } from './places';

export const newsCategories = [
  { slug: 'collection', title: '族谱收藏' },
  { slug: 'general', title: '冯氏文化' },
  ...genealogySites.map(({ slug, place }) => ({ slug, title: place + '资讯' })),
];

export type NewsItem = { slug: string; title: string; date: string; tag: string; summary: string; category: string; province?: string };

export const NEWS: NewsItem[] = [
  ...fengNews,
  {
    slug: 'enping-feng-generations',
    category: 'enping',
    title: '恩平冯氏怎么排世系：两套编号与三大房',
    date: '2026-11-14',
    tag: '指南',
    summary: '恩平冯氏两套编号并行：广东总世系从岭南始祖冯业起算，复春、万辅、宁邦三大房各以本房一世祖起算。总世系主干、三大房排列方式与复春房朝珍一支、梨园岳孔房字辈全录，附世系排法简图。',
  },
  {
    slug: 'feng-surname-origin',
    category: 'general',
    title: '冯姓的来源：从毕公高到冯城得姓',
    date: '2026-11-14',
    tag: '指南',
    summary: '冯姓有两个并列的源头：姬姓一支由毕公高、毕万而下，支孙冯文孙受封冯城、以邑为氏；归姓一支始于郑大夫冯简子。附订正版冯氏来源简图，并说清冯奉世、冯异两汉望族与始平、上党、颍川等郡望的出处。',
  },
  {
    slug: 'enping-feng-roots',
    category: 'enping',
    title: '恩平冯氏寻根指南',
    date: '2026-11-13',
    tag: '指南',
    summary: '从南雄珠玑巷到良西镇小湴村：先定村与房，再查目录与全文——广东冯氏源流、公开族谱目录概况，以及在恩平站查小湴村凝斋房的三步方法。',
  },
];

export const newsPath = ({ category, slug }: NewsItem) => `/news/${category}/${slug}/`;


export const NEWS_INDEX = { href: '/news/', label: '冯氏资讯' };
export const NEWS_DESCRIPTION = '查阅冯氏宗亲新闻、地方族谱资料及寻根指南。';
export const categoryPath = (slug: string) => `/news/${slug}/`;

// Only URLs published before the move to regional news belong here.
const legacySlugs = new Set([
  'feng-ru-enping-aviation', 'enping-feng-juanshou-guide', 'feng-genealogy-library-search',
  'enping-feng-generations', 'feng-surname-origin', 'enping-feng-roots',
]);
export const legacyNews = Object.fromEntries(
  NEWS.filter(({ slug }) => legacySlugs.has(slug)).map((item) => [item.slug, item]),
);
