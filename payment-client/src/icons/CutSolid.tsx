import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCutSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M19.656 4.313c-.773.093-1.46.64-1.687 1.437l-2.657 9.313-3.343.968C11.73 14.336 10.258 13 8.5 13A3.514 3.514 0 005 16.5C5 18.422 6.578 20 8.5 20c1.29 0 2.426-.73 3.031-1.781l3.125-.875-.875 3.125C12.731 21.074 12 22.21 12 23.5c0 1.922 1.578 3.5 3.5 3.5s3.5-1.578 3.5-3.5c0-1.758-1.336-3.23-3.031-3.469l4.469-15.656a1.978 1.978 0 00-.782-.063zm7.969 7.25l-8.719 2.468-.656 2.281 8-2.28a1.996 1.996 0 001.375-2.47zM8.5 15c.84 0 1.5.66 1.5 1.5S9.34 18 8.5 18 7 17.34 7 16.5 7.66 15 8.5 15zm7 7c.84 0 1.5.66 1.5 1.5s-.66 1.5-1.5 1.5-1.5-.66-1.5-1.5.66-1.5 1.5-1.5z'
    })
  );
}
export default SvgCutSolid;
