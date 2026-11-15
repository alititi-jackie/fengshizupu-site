'use client';
import { useRef, useState } from 'react';
import ReadingImageDialog from '../ReadingImageDialog';
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
    <ReadingImageDialog dialog={dialog} src={pages[selected].src}
      width={pages[selected].width} height={pages[selected].height}
      alt={`恩平冯氏族谱卷首影印，第 ${selected + 1} 页高清图`}
      label={`第 ${selected + 1} / ${pages.length} 页`}
      zoomed={zoomed} toggleZoom={() => setZoomed((value) => !value)} />
  </>;
}
