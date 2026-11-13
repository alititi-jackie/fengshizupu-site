import type {Metadata} from 'next';
import './style.css';
import ShareButton from '../components/ShareButton';
import NavButtons from '../components/NavButtons';
export const metadata:Metadata={metadataBase:new URL('https://fengshizupu.com'),title:{default:'冯氏族谱',template:'%s · 冯氏族谱'},description:'面向全国冯氏宗亲的数字族谱档案平台。查阅原谱，寻找姓名，了解世系。',icons:{icon:'/icon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body><a className="skip" href="#main">跳到正文</a><header><a className="brand" href="/"><img src="/icon.svg" alt="" width="46" height="46"/><span>冯氏族谱<small>fengshizupu.com</small></span></a><nav aria-label="主导航"><a href="/">首页</a><a href="/search/">查姓名</a><a href="/regions/">地区目录</a><a href="/archives/">族谱档案</a><a href="/news/">资讯</a><a href="/about/">关于</a><ShareButton/></nav></header><main id="main">{children}</main><footer>冯氏族谱 fengshizupu.com · 留存原谱，连接宗亲<p>全国数字族谱平台</p><a href="/about/">来源、纠错与隐私说明</a></footer><NavButtons/></body></html>}
