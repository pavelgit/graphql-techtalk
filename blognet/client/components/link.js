import React from 'react';
import Link from 'next/link';

export default ({ href, children, ...props }) =>
  <Link href={href}><a className="mdl-navigation__link" {...props}>{ children }</a></Link>;
