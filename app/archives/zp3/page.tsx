import PageHeading from '../../../components/PageHeading';
import ArchiveList from '../../../components/sections/Archives';
import { pageMetadata } from '../../../lib/metadata';

const title = '各地族谱';
export const metadata = pageMetadata(title, '各地冯氏族谱收藏第三页：湖南长沙冯氏续修甲寅谱、江苏毗陵冯氏宗谱、浙江海宁赭山冯氏家谱，逐页在线连读。', '/archives/zp3/');

export default function ArchivesZp3() {
  return <><PageHeading title={title} parents={[]} /><ArchiveList page={3} /></>;
}
