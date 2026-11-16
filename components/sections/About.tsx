import SiteLink from '../SiteLink';
import { ENPING_NINGZHAI, ENPING_URL } from '../../lib/places';

export default function About() {
  return (
    <article className="about-content">
      <h2>平台做什么</h2>
      <p>冯氏族谱是面向全国宗亲的数字族谱平台。主站汇集各地族谱入口、宗亲资讯和寻根指南，各地族谱站提供本地原谱、续修资料和世系查阅。</p>
      <h2>怎样查谱</h2>
      <p>从<a href="/archives/">各地族谱</a>选择地区。查恩平资料，可到<SiteLink href={ENPING_URL}>恩平冯氏族谱</SiteLink>查阅 1995 年重修版原书，按村庄、房支或书页码找谱；也可到<SiteLink href={ENPING_NINGZHAI}>小湴村凝斋房 2026 版</SiteLink>查姓名、看世系和对应谱页。</p>
      <p><a href="/news/enping/enping-feng-roots/">恩平冯氏寻根指南</a>介绍了如何先确定祖籍村和房支，再核对手上的族谱。</p>
      <h2>资料来源与更正</h2>
      <p>查阅人物和世系时，可从人物页打开对应谱页，对照原谱核查。整理或续修资料以各地方站标明的版本和出处为准。</p>
      <p>如发现错漏、希望补充资料或申请撤下资料，请发邮件至 <a href="mailto:323748@gmail.com">323748@gmail.com</a>。请注明地区、村庄、房支、版本和谱页，附上更正内容及依据。如有对应的人物页，可一并附上网址或编号。</p>
    </article>
  );
}
