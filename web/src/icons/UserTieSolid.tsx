import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserTieSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4c-3.855 0-7 3.145-7 7 0 2.379 1.21 4.484 3.031 5.75C7.926 18.352 5 22.352 5 27h2c0-4.398 3.191-8.074 7.375-8.844L15 20h2l.625-1.844C21.809 18.926 25 22.602 25 27h2c0-4.648-2.926-8.648-7.031-10.25C21.789 15.484 23 13.379 23 11c0-3.855-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zm-1 15l-1 6h4l-1-6z'
    })
  );
}
export default SvgUserTieSolid;
