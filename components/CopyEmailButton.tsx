'use client';

import { useState } from 'react';

export default function CopyEmailButton({ email }: { email: string }) {
  const [message, setMessage] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage('邮箱已复制');
    } catch {
      setMessage('请长按或选中上方邮箱复制');
    }
  }

  return <>
    <button type="button" onClick={copyEmail}>复制邮箱</button>
    <span role="status">{message}</span>
  </>;
}
