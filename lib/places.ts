export const ENPING_URL = 'https://enping.fengshizupu.com/';
export const ENPING_XIAOWAN = ENPING_URL + 'editions/v000100/';
export const ENPING_NINGZHAI = ENPING_XIAOWAN + '2026/a000100/';

export type GenealogySite = {
  slug: string;
  place: string;
  title: string;
  url: string;
  description: string;
  search: { url: string; param: string; hint: string };
};

export const enpingSite: GenealogySite =
  { slug: 'enping', place: '恩平', title: '恩平冯氏族谱', url: ENPING_URL,
    description: '查阅 1995 年重修版原书、各村增修资料及小湴村凝斋房 2026 版。',
    search: { url: ENPING_URL, param: 'q', hint: '输入村名、房支、姓名或书页码' } };

export const genealogySites = [enpingSite];
