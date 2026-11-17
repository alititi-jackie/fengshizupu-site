import PageHeading from '../../components/PageHeading';
import CopyEmailButton from '../../components/CopyEmailButton';
import { pageMetadata } from '../../lib/metadata';
import styles from './page.module.css';

const email = '323748@gmail.com';
const title = '宗亲投稿 · 提供资料';
export const metadata = pageMetadata(title, '欢迎提供冯氏旧谱、新修族谱、村庄史料和宗亲新闻，共同保存与传承冯氏历史文化。', '/contribute/');

const categories = [
  {
    title: '提供族谱（旧谱）',
    description: '老谱的影印或照片、谱书线索，以及堂号、字辈、始祖资料等。',
    details: '请附谱名、版本或修谱年代、所属地区、现藏地点及资料来源。',
  },
  {
    title: '提供新族谱',
    description: '欢迎提供近年新修、续修的冯氏族谱。资料完整、文字清晰且符合数字化整理要求的，可视情况整理成支持姓名搜索的数字族谱。',
    details: '请附谱名、修谱年份、所属村庄、全书影印或目录，以及修谱经过。',
  },
  {
    title: '提供村庄族谱资料',
    description: '村庄世系图、房支资料、村庄沿革、老照片，以及本站已收录资料的补充和更正。',
    details: '请注明省市县、乡镇、村名、房支及资料年代，照片请附简要说明。',
  },
  {
    title: '提供新闻',
    description: '修谱、祭祖、宗祠重修落成、宗亲聚会、寻根活动等动态，核实后可刊登于「冯氏资讯」。',
    details: '请附活动时间、地点、事情经过及消息来源，有照片更好。',
  },
];

function mailLink(category = '') {
  const subject = `冯氏族谱投稿${category ? `：${category}` : ''}`;
  const body = `投稿类别：${category}\n内容与来源：\n联系人：\n是否同意公开：\n是否署名（署名或匿名）：\n`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContributePage() {
  return <div className={styles.page}>
    <PageHeading title={title} parents={[]} beforeTitle={<p className="eyebrow">冯氏族谱 · 宗亲共建</p>} />
    <p className={styles.intro}>冯氏族谱散藏于图书馆、宗祠及民间。欢迎各地冯氏宗亲及社会各界朋友提供族谱、村庄史料和宗亲资讯，共同保存与传承冯氏历史文化。</p>
    <ol className={styles.steps} aria-label="投稿流程">
      <li>邮件投稿</li><li>本站核实</li><li>整理发布</li>
    </ol>
    <p className="muted">资料提供者可选择署名或匿名。</p>

    <section aria-labelledby="contribute-categories">
      <h2 id="contribute-categories">欢迎提供以下资料</h2>
      <div className={styles.cards}>
        {categories.map((category) => <article key={category.title} className={styles.card}>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
          <p className={styles.details}>{category.details}</p>
          <a className="button" href={mailLink(category.title)} aria-label={`${category.title}：邮件投稿`}>邮件投稿</a>
        </article>)}
      </div>
    </section>

    <section className={styles.contact} aria-labelledby="contribute-contact">
      <h2 id="contribute-contact">怎样投稿？</h2>
      <p>请将相关资料发送至以下邮箱：</p>
      <a className={styles.email} href={`mailto:${email}`}>{email}</a>
      <div className={styles.copy}><CopyEmailButton email={email} /></div>
      <p>邮件请写明以下信息：</p>
      <ol className={styles.checklist}>
        <li>投稿类别</li>
        <li>资料内容与来源</li>
        <li>联系人</li>
        <li>是否同意公开</li>
        <li>是否署名（署名或匿名）</li>
      </ol>
      <a className="button" href={mailLink()}>立即邮件投稿</a>
    </section>
    <p className={styles.motto}>冯氏族谱 · 寻根溯源 · 世系传承</p>
  </div>;
}
