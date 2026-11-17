import PageHeading from '../../../components/PageHeading';
import ArchiveList from '../../../components/sections/Archives';
import { pageMetadata } from '../../../lib/metadata';

const title = '各地族谱';
export const metadata = pageMetadata(title, '各地冯氏族谱收藏第二页：浙江鄞县浣溪冯氏宗谱等馆藏旧谱，逐页在线连读。', '/archives/zp2/');

export default function ArchivesZp2() {
  return <><PageHeading title={title} parents={[]} /><ArchiveList page={2} /></>;
}
