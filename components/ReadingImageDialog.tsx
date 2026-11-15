import type { RefObject } from 'react';

export default function ReadingImageDialog({ dialog, src, alt, label, zoomed, toggleZoom, width, height }: {
  dialog: RefObject<HTMLDialogElement | null>;
  src?: string;
  alt: string;
  label: string;
  zoomed: boolean;
  toggleZoom: () => void;
  width?: number;
  height?: number;
}) {
  return (
    <dialog className="juanshou-dialog" ref={dialog} aria-label={`${label}放大阅览`}>
      <div className="juanshou-toolbar">
        <span>{label}</span>
        <button type="button" onClick={toggleZoom}>{zoomed ? '适合屏幕' : '放大查看'}</button>
        <button type="button" onClick={() => dialog.current?.close()}>关闭</button>
      </div>
      <div className="juanshou-zoom" key={`${src}-${zoomed}`}>
        {src && <img src={src} width={width} height={height} className={zoomed ? 'is-zoomed' : ''} alt={alt} />}
      </div>
    </dialog>
  );
}
