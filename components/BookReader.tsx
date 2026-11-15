'use client';
import { useEffect, useRef, useState } from 'react';

export type BookItem = { src: string; label: string; alt: string };

export default function BookReader({ archiveId, items }: { archiveId: string; items: BookItem[] }) {
  const total = items.length;
  const [mode, setMode] = useState<'single' | 'scroll'>('single');
  const [cur, setCur] = useState(0);
  const figRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const q = parseInt(new URLSearchParams(location.search).get('p') || '', 10);
    if (q >= 1 && q <= total) setCur(q - 1);
    try {
      if (localStorage.getItem('bookReaderMode') === 'scroll') setMode('scroll');
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mode !== 'scroll') return;
    figRefs.current[cur]?.scrollIntoView({ block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (mode !== 'scroll') return;
    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        const line = 140;
        let idx = 0;
        figRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.top <= line) idx = i;
        });
        setCur((c) => (c === idx ? c : idx));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mode]);

  useEffect(() => {
    history.replaceState(null, '', '?p=' + (cur + 1));
  }, [cur]);

  const go = (i: number) => {
    const n = Math.max(0, Math.min(total - 1, i));
    setCur(n);
    if (mode === 'scroll') figRefs.current[n]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(cur - 1);
      if (e.key === 'ArrowRight') go(cur + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const pick = (m: 'single' | 'scroll') => {
    setMode(m);
    try {
      localStorage.setItem('bookReaderMode', m);
    } catch {}
    if (m === 'single') window.scrollTo(0, 0);
  };

  return (
    <div className={mode === 'scroll' ? 'bookreader br-scroll' : 'bookreader br-single'}>
      <div className="br-bar controls">
        <a href={`/archives/${archiveId}/`}>← 返回档案</a>
        <span aria-live="polite">
          第 {cur + 1} / {total} 页 · {items[cur].label}
        </span>
        <span className="br-modes" role="group" aria-label="阅览模式">
          <button type="button" className={mode === 'single' ? 'on' : ''} onClick={() => pick('single')}>
            单页
          </button>
          <button type="button" className={mode === 'scroll' ? 'on' : ''} onClick={() => pick('scroll')}>
            连看
          </button>
        </span>
      </div>
      {items.map((it, i) => (
        <figure
          key={it.src}
          ref={(el) => {
            figRefs.current[i] = el;
          }}
          className={i === cur ? 'br-page cur' : 'br-page'}
        >
          <img src={it.src} alt={it.alt} loading={i < 2 ? undefined : 'lazy'} width={1241} height={1754} />
          <figcaption>{it.label}</figcaption>
        </figure>
      ))}
      <div className="controls br-nav">
        <button type="button" onClick={() => go(cur - 1)} disabled={cur <= 0}>
          ← 上一页
        </button>
        <button type="button" onClick={() => go(cur + 1)} disabled={cur >= total - 1}>
          下一页 →
        </button>
      </div>
    </div>
  );
}
