import PageHeading from '../../components/PageHeading';
import About from '../../components/sections/About';
import { pageMetadata } from '../../lib/metadata';

const title = '关于冯氏族谱';
export const metadata = pageMetadata(title, '了解冯氏族谱平台、各地查阅入口和资料更正方式。', '/about/');

export default function AboutPage() {
  return <><PageHeading title={title} parents={[]} /><About /></>;
}
