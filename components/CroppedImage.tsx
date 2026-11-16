import type { CSSProperties } from 'react';

export type ImageCrop = { width: number; height: number; inset: [number, number, number, number] };

export default function CroppedImage({ src, alt, crop, zoomed = false }: {
  src: string;
  alt: string;
  crop: ImageCrop;
  zoomed?: boolean;
}) {
  const { width, height, inset: [top, right, bottom, left] } = crop;
  const visibleWidth = width - left - right;
  const visibleHeight = height - top - bottom;
  const style = {
    '--crop-ratio': visibleWidth / visibleHeight,
    '--crop-width': `${100 * width / visibleWidth}%`,
    '--crop-left': `${-100 * left / visibleWidth}%`,
    '--crop-top': `${-100 * top / visibleHeight}%`,
  } as CSSProperties;
  return (
    <span className={zoomed ? 'news-image-crop is-zoomed' : 'news-image-crop'} style={style}>
      <img src={src} alt={alt} width={width} height={height} />
    </span>
  );
}
