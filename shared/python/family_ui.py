"""Shared generated-site UI. Source: fengshizupu-site/shared/python/family_ui.py."""
from html import escape
from hashlib import sha256
from pathlib import Path

def asset_version(root, name):
    return sha256((Path(root) / 'assets' / name).read_bytes()).hexdigest()[:12]

def image_dialog():
    return """<dialog id="imageDialog" class="image-dialog" aria-labelledby="imageLabel">
<div class="image-toolbar"><span id="imageLabel"></span><button type="button" id="imageZoom">放大查看</button><button type="button" id="imageClose">关闭</button></div>
<div class="image-viewport"><img id="imageLarge" alt=""></div></dialog>"""

def reader_toolbar(back_url, back_label, maximum, *, page_label='页码', edition=False):
    extra = ' edition-readerbar' if edition else ''
    info = f'<b>1</b>/{maximum}<span class="full-only"> · 封面</span>' if edition else ''
    branch = '' if edition else '<span class="info" id="branchInfo"></span>'
    selected = ' class="on" aria-pressed="true"' if edition else ''
    return f"""<div class="readerbar{extra}">
<a class="nav" href="{escape(back_url)}">{escape(back_label)}</a>
<span class="info" id="info" aria-live="polite">{info}</span>{branch}
<span class="reader-spacer"></span>
<span class="modes"><button id="mSingle" type="button">单页</button><button id="mScroll" type="button"{selected}>连看</button></span>
<button id="jumpToggle" type="button" aria-expanded="false">跳页</button>
<label class="info jumpctl">{escape(page_label)} <input id="jump" type="number" min="1" max="{maximum}"></label>
<button class="primary" id="jumpBtn">跳页</button></div>"""

SVG_BACK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>'
SVG_TOP = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
FAB = '<div class="fab"><button id="fabTop" type="button" title="回到顶部" aria-label="回到顶部">'+SVG_TOP+'</button><button id="fabBack" type="button" title="返回" aria-label="返回" onclick="history.back()">'+SVG_BACK+'</button></div>'
FAB_SCRIPT = """<script>
var ft=document.getElementById('fabTop');
function fabShow(){ft.classList.toggle('on',window.scrollY>900)}
window.addEventListener('scroll',fabShow,{passive:true});fabShow();
ft.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
function sharePage(){var u=location.href,t=document.title;
var d=document.querySelector('meta[name="description"]');
if(navigator.share){navigator.share({title:t,text:d?d.content:'',url:u}).catch(function(){});}
else if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){
var w=document.querySelector('.share-wrap')||document.querySelector('.mainnav-in');
var el=w.querySelector('.share-toast');if(!el){el=document.createElement('span');el.className='share-toast';el.setAttribute('role','status');w.appendChild(el)}
el.textContent='链接已复制';el.style.display='block';setTimeout(function(){el.style.display='none'},2000);
}).catch(function(){});}}
</script>"""
