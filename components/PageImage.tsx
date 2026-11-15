'use client';
import { useRef, useState } from 'react';

export default function PageImage({ src, alt, caption, width = 1241, height = 1754, croppedPreview = false }: { src: string; alt: string; caption: string; width?: number; height?: number; croppedPreview?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  function open() {
    setZoomed(false);
    dialog.current?.showModal();
  }
  return (
    <>
      <figure className="pageimg">
        <button type="button" className={croppedPreview ? 'pageimg-open tallimg' : 'pageimg-open'} onClick={open} aria-label={`放大查看：${alt}`}>
          <img src={src} alt={alt} width={width} height={height} />
          {croppedPreview && <span className="tallimg-tip">点击查看完整大图 ›</span>}
        </button>
        {!croppedPreview && <figcaption>{caption} · 点击图片可放大查看</figcaption>}
      </figure>
      <dialog className="pagezoom-dialog" ref={dialog} aria-label={`${alt}放大阅览`}>
        <div className="pagezoom-toolbar">
          <span>{caption}</span>
          <button type="button" onClick={() => setZoomed(!zoomed)}>
            {zoomed ? '适合屏幕' : '放大查看'}
          </button>
          <button type="button" onClick={() => dialog.current?.close()}>
            关闭
          </button>
        </div>
        <div className="pagezoom-zoom">
          <img src={src} alt={alt} className={zoomed ? 'is-zoomed' : ''} />
        </div>
      </dialog>
    </>
  );
}
