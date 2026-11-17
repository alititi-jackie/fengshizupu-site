export function fmtDate(value: string) {
  const [year, month, day] = value.split('-');
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}
