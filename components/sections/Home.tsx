import FeatureCard from '../FeatureCard';
import { fmtDate } from '../../lib/format';
import SiteLink from '../SiteLink';
import RegionalSearch from '../RegionalSearch';
import { enpingSite } from '../../lib/places';
import { fengLinks } from './fengLinks';
import { NEWS, newsPath } from '../../lib/news';



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
      <FeatureCard href="https://enping.fengshizupu.com" title="《恩平冯氏族谱》全书在线查阅" motto="寻根溯源 · 世系传承" description="恩平冯氏总谱全书 1,269 页逐页看图，可按房支、村庄查找" action="看全书" mobileAction="去看全书" />
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
                <SiteLink href={l.url}>{l.name}</SiteLink>
                {l.note ? ` — ${l.note}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}
      <FeatureCard href="/enping-fengshi-juanshou/" title="《恩平冯氏族谱 · 卷首影印》" motto="始平世泽 · 大树家声" description="恩平冯氏总谱卷首影印：谱序、倡修经过与修谱合影" action="在线阅览" mobileAction="在线阅览" />
    </>
  );
}
