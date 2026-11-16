import PageHeading from '../../components/PageHeading';
import { NewsIndex } from '../../components/sections/News';
import { NEWS_INDEX, NEWS_DESCRIPTION } from '../../lib/news';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata(NEWS_INDEX.label, NEWS_DESCRIPTION, NEWS_INDEX.href);

export default function NewsPage() {
  return <><PageHeading title={NEWS_INDEX.label} parents={[]} /><NewsIndex /></>;
}
