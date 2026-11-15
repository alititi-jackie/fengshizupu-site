import type { ComponentProps } from 'react';

export const SITE_SEARCH_HINT = '输入姓名、村名、房名或编号';

export function SearchField(props: ComponentProps<'input'>) {
  return <input type="text" aria-label={props.placeholder} {...props} />;
}

export function SearchSubmit() {
  return <button type="submit">搜索</button>;
}
