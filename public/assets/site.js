const normalizeQuery = (value) => value.normalize('NFKC').replaceAll('馮', '冯').trim().toLowerCase().replace(/\s+/g, ' ');
const matchesSearch = (keys, term) => term.split(' ').every(word => keys.includes(word));
const readerURL = (page) => '/reader.html?p=' + page;

function filterList(id, statusId, selector, unit, showUnfiltered = true) {
  const input = document.getElementById(id);
  const status = document.getElementById(statusId);
  const rows = [...document.querySelectorAll(selector)].map(row => [row, normalizeQuery(row.dataset.q)]);
  const update = () => {
    const term = normalizeQuery(input.value);
    let count = 0;
    for (const [row, keys] of rows) {
      const visible = term ? matchesSearch(keys, term) : showUnfiltered;
      row.style.display = visible ? '' : 'none';
      if (visible) count++;
    }
    status.textContent = term ? (count ? '找到 ' + count + ' ' + unit : '暂未找到相关记录，请换个关键词。') : '';
  };
  input.addEventListener('input', update);
  update();
}

function bindImageDialog() {
  const dialog = document.getElementById('imageDialog');
  const caption = document.getElementById('imageLabel');
  const image = document.getElementById('imageLarge');
  const zoom = document.getElementById('imageZoom');
  const viewport = image.parentElement;
  zoom.onclick = () => {
    zoom.textContent = image.classList.toggle('zoomed') ? '适合屏幕' : '放大查看';
    viewport.scrollTo(0, 0);
  };
  document.getElementById('imageClose').onclick = () => dialog.close();
  return {
    dialog,
    open(src, label) {
      caption.textContent = label;
      image.src = src;
      image.alt = label;
      image.classList.remove('zoomed');
      zoom.textContent = '放大查看';
      dialog.showModal();
      viewport.scrollTo(0, 0);
    },
  };
}
