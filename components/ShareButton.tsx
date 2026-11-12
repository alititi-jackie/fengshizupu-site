'use client';
import {useState} from 'react';

export default function ShareButton(){
  const [copied,setCopied]=useState(false);
  async function share(){
    const url=window.location.href;
    const title=document.title;
    if(navigator.share){
      try{await navigator.share({title,url});}catch{/* user cancelled */}
      return;
    }
    try{
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(()=>setCopied(false),2000);
    }catch{/* clipboard unavailable */}
  }
  return <span className="share-wrap">
    <button type="button" className="share-text" onClick={share}>分享</button>
    {copied&&<span className="share-toast" role="status">链接已复制</span>}
  </span>;
}
