import type {Metadata} from 'next';
import './style.css';
import themeSource from 'node:fs';
import { createHash } from 'node:crypto';

const themeVersion = createHash('sha256').update(themeSource.readFileSync('public/assets/genealogy-theme.css')).digest('hex').slice(0,12);
import NavBar from '../components/NavBar';
import NavButtons from '../components/NavButtons';
export const metadata:Metadata={metadataBase:new URL('https://fengshizupu.com'),title:{default:'冯氏族谱',template:'%s · 冯氏族谱'},description:'面向全国冯氏宗亲的数字族谱档案平台。查阅原谱，寻找姓名，了解世系。',icons:{icon:'/icon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><head><link rel="stylesheet" href={`/assets/genealogy-theme.css?v=${themeVersion}`} /></head><body className="site-theme"><a className="skip" href="#main">跳到正文</a><header className="site-header"><a className="brand" href="/"><img src="/icon.svg" alt="" width="46" height="46"/><span>冯氏族谱<small>fengshizupu.com</small></span></a></header><NavBar/><main id="main">{children}</main><footer className="site-footer"><a href="/contribute/">宗亲投稿 · 提供资料</a><br/>冯氏族谱 · 留存原谱，连接宗亲<br/>全国数字族谱平台 · <a href="/">fengshizupu.com</a> · <a href="/about/">关于本站</a></footer><NavButtons/></body></html>}
