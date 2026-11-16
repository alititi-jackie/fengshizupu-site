import PageHeading from '../../components/PageHeading';
import ArchiveList from '../../components/sections/Archives';
import { pageMetadata } from '../../lib/metadata';

const title = '各地族谱';
export const metadata = pageMetadata(title, '从各地族谱入口查阅恩平冯氏族谱及小湴村凝斋房 2026 版。', '/archives/');

export default function Archives() {
  return <><PageHeading title={title} parents={[]} /><ArchiveList /></>;
}
