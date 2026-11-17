function readerPage(fallback, total) {
  const value = Number(new URLSearchParams(location.search).get('p'));
  return Number.isInteger(value) && value >= 1 && value <= total ? value : fallback;
}

function updateReaderURL(page) {
  const url = new URL(location.href);
  url.searchParams.set('p', page);
  if (url.href !== location.href) history.replaceState(null, '', url);
}

function bindReaderControls({ previous, next, move, setMode, jumpTo, dialog }) {
  const single = document.getElementById('mSingle');
  const scroll = document.getElementById('mScroll');
  const jump = document.getElementById('jump');
  const toggle = document.getElementById('jumpToggle');

  function showJump(open) {
    document.body.classList.toggle('jumpon', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open) jump.focus();
  }

  function submit() {
    if (!jump.value) return;
    const page = jumpTo(Number(jump.value));
    if (!page) {
      jump.setCustomValidity('请输入有效页码。');
      jump.reportValidity();
      return;
    }
    jump.setCustomValidity('');
    jump.blur();
    showJump(false);
    move(page);
  }

  previous.addEventListener('click', event => { event.preventDefault(); move(-1, true); });
  next.addEventListener('click', event => { event.preventDefault(); move(1, true); });
  single.onclick = () => setMode('single');
  scroll.onclick = () => setMode('scroll');
  toggle.onclick = () => showJump(!document.body.classList.contains('jumpon'));
  document.getElementById('jumpBtn').onclick = submit;
  jump.addEventListener('input', () => jump.setCustomValidity(''));
  jump.addEventListener('keydown', event => {
    if (event.key === 'Enter') submit();
    if (event.key === 'Escape' && document.body.classList.contains('jumpon')) {
      showJump(false);
      toggle.focus();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || dialog.open || event.altKey || event.ctrlKey || event.metaKey ||
        event.target.closest?.('input,textarea,select,[contenteditable]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1, true);
    }
  });
  return mode => {
    document.body.classList.toggle('scrollmode', mode === 'scroll');
    for (const [button, active] of [[single, mode === 'single'], [scroll, mode === 'scroll']]) {
      button.classList.toggle('on', active);
      button.setAttribute('aria-pressed', String(active));
    }
  };
}
