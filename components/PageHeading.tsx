import { Fragment, type ReactNode } from 'react';

export default function PageHeading({ title, parents, beforeTitle }: {
  title: string;
  parents: { href: string; label: string }[];
  beforeTitle?: ReactNode;
}) {
  return (
    <>
      <nav className="crumb" aria-label="面包屑">
        <a href="/">首页</a>
        {parents.map(({ href, label }) => <Fragment key={href}> / <a href={href}>{label}</a></Fragment>)}
        {' / '}<span aria-current="page">{title}</span>
      </nav>
      {beforeTitle}
      <h1>{title}</h1>
    </>
  );
}
