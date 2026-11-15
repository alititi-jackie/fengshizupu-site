'use client';
import { useRef, useState } from 'react';
import pages from '../../data/enping-juanshou.json';

export default function EnpingJuanshou() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  function open(index: number) {
    setSelected(index);
    setZoomed(false);
    dialog.current?.showModal();
  }
  return <>
    <p className="juanshou-intro">共 17 页，按原书顺序连续展示。向下滑动阅读，点击图片可放大查看。</p>
    <div className="juanshou-pages">
      {pages.map((page, index) => <figure key={page.src}>
        <button className="juanshou-image" onClick={() => open(index)} aria-label={`放大第 ${index + 1} 页`}>
          <img src={page.src} width={page.width} height={page.height} alt={`恩平冯氏族谱卷首影印，第 ${index + 1} 页`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
        </button>
        <figcaption>第 {index + 1} / {pages.length} 页</figcaption>
      </figure>)}
    </div>
    <div className="juanshou-complete">
      <a className="button" href="https://enping.fengshizupu.com/" target="_blank" rel="noopener noreferrer">查看完整的恩平冯氏族谱</a>
    </div>
    <dialog className="juanshou-dialog" ref={dialog} aria-label={`第 ${selected + 1} 页放大阅览`}>
      <div className="juanshou-toolbar">
        <span>第 {selected + 1} / {pages.length} 页</span>
        <button onClick={() => setZoomed(!zoomed)}>{zoomed ? '适合屏幕' : '放大查看'}</button>
        <button onClick={() => dialog.current?.close()}>关闭</button>
      </div>
      <div className="juanshou-zoom" key={`${selected}-${zoomed}`}>
        <img src={pages[selected].src} width={pages[selected].width} height={pages[selected].height} className={zoomed ? 'is-zoomed' : ''} alt={`恩平冯氏族谱卷首影印，第 ${selected + 1} 页高清图`} />
      </div>
    </dialog>
  </>;
}
