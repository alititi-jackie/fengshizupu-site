import PageHeading from '../../components/PageHeading';
import UnifiedSearch from '../../components/UnifiedSearch';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata(
  '全站搜索',
  '搜索恩平冯氏族谱原书、小湴村凝斋房 2026 版人物、各地冯氏族谱收藏与本站资讯。',
  '/search/',
);

export default function SearchPage() {
  return (
    <>
      <PageHeading title="全站搜索" parents={[]} />
      <UnifiedSearch />
    </>
  );
}
