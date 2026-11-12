import { fengLinks } from './fengLinks';

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">全国冯氏宗亲 · 数字族谱档案</p>
        <h1>寻根有据，<br />世系有源。</h1>
        <p>从一页家谱，读懂一家人的来处。留存珍贵原谱，让宗亲记忆代代相传。</p>
        <form action="/search/">
          <input name="q" aria-label="查找姓名或编号" placeholder="输入姓名或编号，寻找原谱中的亲人" />
          <button>查姓名 →</button>
        </form>
      </section>
      <div className="grid">
        <article>
          <h2>族谱档案</h2>
          <p>按原谱版式重排，可逐页查阅、下载单页或整版 PDF。</p>
          <a href="/archives/a000100/">进入族谱档案 →</a>
        </article>
        <article>
          <h2>从村庄走向全国</h2>
          <p>按地区与村庄持续收录，人物和谱页拥有永久网址。</p>
          <a href="/regions/">浏览地区目录 →</a>
        </article>
      </div>
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
    </>
  );
}
