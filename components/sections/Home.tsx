import RegionalSearch from '../RegionalSearch';
import { enpingSite } from '../../lib/places';
import { fengLinks } from './fengLinks';
import { NEWS, newsPath } from '../../lib/news';

function fmtDate(d: string) {
  const [y, m, dd] = d.split('-');
  return `${y} 年 ${Number(m)} 月 ${Number(dd)} 日`;
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">全国冯氏宗亲 · 数字族谱档案</p>
        <h1>寻根有据，世系有源。</h1>
        <p>从一页家谱，读懂一家人的来处。留存珍贵原谱，让宗亲记忆代代相传。</p>
        <RegionalSearch site={enpingSite} home />
      </section>
      <section className="home-news">
        <div className="home-news-head">
          <h2>冯氏资讯</h2>
          <a href="/news/">全部资讯 ›</a>
        </div>
        {NEWS.slice(0, 2).map((n) => (
          <p className="home-news-item" key={n.slug}>
            <span className="badge">{n.tag}</span>{' '}
            <a href={newsPath(n)}>{n.title}</a>{' '}
            <small>{fmtDate(n.date)}</small>
          </p>
        ))}
      </section>
      <a className="enping-card" href="https://enping.fengshizupu.com" target="_blank" rel="noopener noreferrer">
        <span className="enping-seal">冯</span>
        <span className="enping-body">
          <span className="enping-title">《恩平冯氏族谱》全书在线查阅</span>
          <span className="enping-motto">寻根溯源 · 世系传承</span>
          <span className="enping-intro">恩平冯氏总谱全书 1,269 页逐页看图，可按房支、村庄查找<span className="enping-more">　去看全书 ›</span></span>
        </span>
        <span className="enping-btn">看全书</span>
      </a>
      <article>
        <h2>各地族谱</h2>
        <p>从各地族谱入口查阅原书、续修谱和世系资料。</p>
        <a href="/archives/">进入族谱目录 →</a>
      </article>
      {fengLinks.length > 0 && (
        <section>
          <h2>冯氏宗亲网站</h2>
          <ul>
            {fengLinks.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">{l.name}</a>
                {l.note ? ` — ${l.note}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}
      <a className="enping-card" href="/enping-fengshi-juanshou/">
        <span className="enping-seal">冯</span>
        <span className="enping-body">
          <span className="enping-title">《恩平冯氏族谱 · 卷首影印》</span>
          <span className="enping-motto">始平世泽 · 大树家声</span>
          <span className="enping-intro">恩平冯氏总谱卷首影印：谱序、倡修经过与修谱合影<span className="enping-more">　在线阅览 ›</span></span>
        </span>
        <span className="enping-btn">在线阅览</span>
      </a>
    </>
  );
}
