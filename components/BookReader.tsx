'use client';
import { useEffect, useRef, useState } from 'react';

export type BookItem = { src: string; label: string; alt: string };

export default function BookReader({ archiveId, items }: { archiveId: string; items: BookItem[] }) {
  const total = items.length;
  const [mode, setMode] = useState<'single' | 'scroll'>('single');
  const [cur, setCur] = useState(0);
  const [jump, setJump] = useState('');
  const [jumpOpen, setJumpOpen] = useState(false);
  const figRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const q = parseInt(new URLSearchParams(location.search).get('p') || '', 10);
    if (q >= 1 && q <= total) setCur(q - 1);
    try {
      if (localStorage.getItem('bookReaderMode') !== 'single') setMode('scroll');
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

  const doJump = () => {
    const v = parseInt(jump, 10);
    if (v >= 1 && v <= total) go(v - 1);
    setJumpOpen(false);
  };

  const pick = (m: 'single' | 'scroll') => {
    setMode(m);
    try {
      localStorage.setItem('bookReaderMode', m);
    } catch {}
    if (m === 'single') window.scrollTo(0, 0);
  };

  return (
    <div className={mode === 'scroll' ? 'bookreader br-scroll' : 'bookreader br-single'}>
      <div className={jumpOpen ? 'br-bar jumpon' : 'br-bar'}>
        <a className="br-home" href={`/archives/${archiveId}/`}>
          返回档案
        </a>
        <span className="br-info" aria-live="polite">
          第 <b>{cur + 1}</b>
          <span className="br-info-extra">
            {' '}
            / {total} 页 · {items[cur].label}
          </span>
        </span>
        <span className="br-flex" />
        <span className="br-modes" role="group" aria-label="阅览模式">
          <button type="button" className={mode === 'single' ? 'on' : ''} onClick={() => pick('single')}>
            单页
          </button>
          <button type="button" className={mode === 'scroll' ? 'on' : ''} onClick={() => pick('scroll')}>
            连看
          </button>
        </span>
        <button type="button" className="br-jumptoggle" onClick={() => setJumpOpen((o) => !o)}>
          跳页
        </button>
        <label className="br-jumplabel">
          页码
          <input
            className="br-jump"
            type="number"
            min={1}
            max={total}
            value={jump}
            onChange={(e) => setJump(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') doJump();
            }}
          />
        </label>
        <button type="button" className="br-primary" onClick={doJump}>
          跳页
        </button>
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
