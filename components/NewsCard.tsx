import { fmtDate } from '../lib/format';
import { newsPath, type NewsItem } from '../lib/news';

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article>
      <p><span className="badge">{item.tag}</span> <small>{fmtDate(item.date)}</small></p>
      <h2><a href={newsPath(item)}>{item.title}</a></h2>
      <p>{item.summary}</p>
    </article>
  );
}
