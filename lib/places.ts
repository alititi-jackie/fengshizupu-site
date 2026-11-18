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

export type GenealogyCollection = { title: string; url: string; description: string; page?: number };

export const genealogyCollections: GenealogyCollection[] = [
  { title: '小湴村凝斋房', url: ENPING_NINGZHAI,
    description: '在恩平冯氏族谱里查阅 2026 版，可查姓名、看世系及谱页。' },
  { title: '浙江乐清小荊冯氏宗谱', url: 'https://zp1.fengshizupu.com/book/yueqing-xiaojing-feng.html',
    description: '温州图书馆藏本，1993 年癸酉重修，6 册 894 页，逐页在线连读，可下载 PDF。' },
  { title: '广东顺德大良竹园冯氏族谱', url: 'https://zp1.fengshizupu.com/book/shunde-daliang-zhuyuan-feng.html',
    description: '上海图书馆藏本，清道光十二年（1832）修，十卷 851 页，逐页在线连读，可下载 PDF。' },
  { title: '山西代州冯氏族谱', url: 'https://zp1.fengshizupu.com/book/daizhou-feng.html',
    description: '南京图书馆藏本，民国二十二年（1933）刊，四卷 1,317 页，逐页在线连读，可下载 PDF。' },
  { title: '山西代县道后冯氏世谱', url: 'https://zp1.fengshizupu.com/book/daohou-feng-shipu.html',
    description: '国家图书馆藏本，清冯廷正纂修，姚鼐乾隆五十二年（1787）序，四册 453 页，逐页在线连读，可下载 PDF。' },
  { title: '浙江诸暨紫岩冯氏宗谱', url: 'https://zp1.fengshizupu.com/book/zhuji-ziyan-feng.html',
    description: '上海图书馆藏本，民国十八年（1929）接修，冯仲达等纂修，全一册 748 页，逐页在线连读，可下载 PDF。' },
  { title: '湖北富川荆源冯氏宗谱', url: 'https://zp1.fengshizupu.com/book/fuchuan-jingyuan-feng.html',
    description: '上海图书馆藏本，民国二十六年（1937）修，存卷行传 179 页，逐页在线连读，可下载 PDF。' },
  { title: '湖南湘潭油麻岭冯氏六修族谱', url: 'https://zp1.fengshizupu.com/book/youmaling-feng-liuxiu.html',
    description: '上海图书馆藏本，民国二十二年（1933）六修，冯镇嵩等纂修，二十七卷 4,163 页，逐页在线连读，可下载 PDF。' },
  { title: '湖南湘潭油麻岭冯氏四修族谱', url: 'https://zp1.fengshizupu.com/book/youmaling-feng-sixiu.html',
    description: '上海图书馆藏本，清同治六年（1867）修，冯芳绥等修，存卷 402 页，逐页在线连读，可下载 PDF。' },
  { title: '浙江仙居柯溪冯氏宗谱', url: 'https://zp1.fengshizupu.com/book/xianju-kexi-feng.html',
    description: '上海图书馆藏本，民国三年（1914）重修，十一卷 2,282 页，逐页在线连读，可下载 PDF。' },
  { title: '浙江鄞县浣溪冯氏宗谱', url: 'https://zp2.fengshizupu.com/book/yinxian-huanxi-feng.html',
    description: '天一阁藏本，民国十八年（1929）修，冯义圻等纂修，三十六卷 725 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '浙江鄞县后仓浣锦冯氏宗谱', url: 'https://zp2.fengshizupu.com/book/houcang-huanjin-feng.html',
    description: '上海图书馆藏本，民国十年（1921）修，冯义圭等纂修，三十四卷 1,338 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '浙江诸暨燕山冯氏宗谱', url: 'https://zp2.fengshizupu.com/book/zhuji-yanshan-feng.html',
    description: '国家图书馆藏本，清嘉庆二十五年（1820）重修，四卷 527 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '安徽祁门中井河东冯氏宗谱', url: 'https://zp2.fengshizupu.com/book/qimen-zhongjing-hedong-feng.html',
    description: '上海图书馆藏本，清嘉庆九年（1804）修，冯光岱纂修，588 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '湖南湘潭石潭冯氏六修族谱', url: 'https://zp2.fengshizupu.com/book/shitan-feng-liuxiu.html',
    description: '上海图书馆藏本，六修存卷，807 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '湖南湘潭裕家湾冯氏六修族谱', url: 'https://zp2.fengshizupu.com/book/yujiawan-feng-liuxiu.html',
    description: '上海图书馆藏本，六修存卷，198 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '重修花溪上党冯氏近谱', url: 'https://zp2.fengshizupu.com/book/huaxi-shangdang-feng.html',
    description: '上海图书馆藏本，民国年间重修，九卷 268 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '浙江义乌孝冯氏家谱', url: 'https://zp2.fengshizupu.com/book/yiwu-xiaofeng.html',
    description: '上海图书馆藏本，民国年间印本，101 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '浙江慈谿冯氏宗谱', url: 'https://zp2.fengshizupu.com/book/cixi-feng.html',
    description: '天一阁藏本，清同治抄本，冯维岳纂修，42 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '江苏宜兴祝堂冯氏家乘', url: 'https://zp2.fengshizupu.com/book/zhutang-feng.html',
    description: '上海图书馆藏本，民国三十年（1941）重辑，冯舜耕纂修，八卷 1468 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '湖南湘乡山田冯氏族谱', url: 'https://zp2.fengshizupu.com/book/shantian-feng.html',
    description: '上海图书馆藏本，清木活字本，存第七卷世系 186 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '湖南岳阳冯氏族谱', url: 'https://zp2.fengshizupu.com/book/yueyang-feng.html',
    description: '上海图书馆藏本，民国二十五年（1936）续修，存卷为宗图 183 页，逐页在线连读，可下载 PDF。', page: 2 },
  { title: '江西遂川冯氏族谱', url: 'https://zp2.fengshizupu.com/book/suichuan-feng.html',
    description: '上海图书馆藏本，民国三十七年（1948）修，不分卷 170 页，逐页在线连读，可下载 PDF。', page: 2 },,
  { title: '湖南长沙冯氏续修甲寅谱', url: 'https://zp3.fengshizupu.com/book/changsha-feng-jiayin.html',
    description: '上海图书馆藏本，民国三年（1914）修，冯忠璘主修，三十卷 2,037 页，逐页在线连读，可下载 PDF。', page: 3 },
  { title: '江苏毗陵冯氏宗谱', url: 'https://zp3.fengshizupu.com/book/piling-feng-shixiu.html',
    description: '上海图书馆藏本，民国十六年（1927）十修，3,445 页，逐页在线连读，可下载 PDF。', page: 3 },
  { title: '浙江海宁赭山冯氏家谱', url: 'https://zp3.fengshizupu.com/book/zheshan-feng.html',
    description: '上海图书馆藏本，清宣统元年（1909）重修，二十二卷 3,727 页，逐页在线连读，可下载 PDF。', page: 3 },
];
