import { fengNews } from './feng-news';
import { genealogySites } from './places';

export const newsCategories = [
  ...genealogySites.map(({ slug, place }) => ({ slug, title: place + '资讯' })),
  { slug: 'general', title: '通用资讯' },
];

export type NewsItem = { slug: string; title: string; date: string; tag: string; summary: string; category: string };

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

export function findNews(path: string[]) {
  const slug = path.length === 2 ? path[1] : path[2];
  return NEWS.find((item) => item.slug === slug && (path.length === 2 || item.category === path[1]));
}
