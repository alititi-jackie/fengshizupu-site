'use client';
import CroppedImage, { type ImageCrop } from './CroppedImage';
import ReadingImageDialog from './ReadingImageDialog';
import { useRef, useState } from 'react';

export default function PageImage({ src, alt, caption, width = 1241, height = 1754, croppedPreview = false, inset, showCaption = false }: { src: string; alt: string; caption: string; width?: number; height?: number; croppedPreview?: boolean; inset?: ImageCrop['inset']; showCaption?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const crop = inset ? { width, height, inset } : undefined;
  function open() {
    setZoomed(false);
    dialog.current?.showModal();
  }
  return (
    <>
      <figure className="pageimg">
        <button type="button" className={croppedPreview ? 'pageimg-open tallimg' : 'pageimg-open'} onClick={open} aria-label={`放大查看：${alt}`}>
          {crop ? <CroppedImage src={src} alt={alt} crop={crop} /> : <img src={src} alt={alt} width={width} height={height} />}
          {croppedPreview && <span className="tallimg-tip">点击查看完整大图 ›</span>}
        </button>
        {!croppedPreview && <figcaption>{caption} · 点击图片可放大查看</figcaption>}
        {croppedPreview && showCaption && <figcaption>{caption}</figcaption>}
      </figure>
      <ReadingImageDialog dialog={dialog} src={src} alt={alt} label={caption}
        width={width} height={height}
        crop={crop} zoomed={zoomed} toggleZoom={() => setZoomed((value) => !value)} />
    </>
  );
}
