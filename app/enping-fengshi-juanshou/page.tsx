import PageHeading from '../../components/PageHeading';
import EnpingJuanshou from '../../components/sections/EnpingJuanshou';
import { pageMetadata } from '../../lib/metadata';

const title = '恩平冯氏族谱 · 卷首影印';
export const metadata = pageMetadata(title, '查看《恩平冯氏族谱》卷首影印共 17 页，包含谱序、倡修经过与修谱合影。', '/enping-fengshi-juanshou/');

export default function PrefacePage() {
  return <><PageHeading title={title} parents={[]} /><EnpingJuanshou /></>;
}
