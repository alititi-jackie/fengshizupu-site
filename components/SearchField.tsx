import type { ComponentProps } from 'react';

export function SearchField(props: ComponentProps<'input'>) {
  return <input type="text" aria-label={props.placeholder} {...props} />;
}

export function SearchSubmit() {
  return <button type="submit">搜索</button>;
}
