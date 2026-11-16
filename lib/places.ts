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

export const genealogyCollections = [
  { title: '小湴村凝斋房', url: ENPING_NINGZHAI,
    description: '在恩平站查阅 2026 版，可查姓名、看世系及谱页。' },
  { title: '浙江乐清小荊冯氏宗谱', url: 'https://zp1.fengshizupu.com/book/yueqing-xiaojing-feng.html',
    description: '温州图书馆藏本，1993 年癸酉重修，6 册 894 页，逐页在线连读，可下载 PDF。' },
  { title: '广东顺德大良竹园冯氏族谱', url: 'https://zp1.fengshizupu.com/book/shunde-daliang-zhuyuan-feng.html',
    description: '上海图书馆藏本，清道光十二年（1832）修，十卷 851 页，逐页在线连读，可下载 PDF。' },
  { title: '山西代州冯氏族谱', url: 'https://zp1.fengshizupu.com/book/daizhou-feng.html',
    description: '南京图书馆藏本，民国二十三年（1934）刊，四卷 1,317 页，逐页在线连读，可下载 PDF。' },
  { title: '山西代县道后冯氏世谱', url: 'https://zp1.fengshizupu.com/book/daohou-feng-shipu.html',
    description: '国家图书馆藏本，清冯廷正纂修，姚鼐乾隆五十二年（1787）序，四册 453 页，逐页在线连读，可下载 PDF。' },
  { title: '浙江诸暨紫岩冯氏宗谱', url: 'https://zp1.fengshizupu.com/book/zhuji-ziyan-feng.html',
    description: '上海图书馆藏本，民国十八年（1929）接修，冯仲达等纂修，全一册 748 页，逐页在线连读，可下载 PDF。' },
];
