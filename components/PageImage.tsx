'use client';
import ReadingImageDialog from './ReadingImageDialog';
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
      <ReadingImageDialog dialog={dialog} src={src} alt={alt} label={caption}
        zoomed={zoomed} toggleZoom={() => setZoomed((value) => !value)} />
    </>
  );
}
