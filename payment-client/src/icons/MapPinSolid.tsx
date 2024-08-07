import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMapPinSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-3.855 0-7 3.145-7 7 0 3.516 2.617 6.418 6 6.906V28h2v-9.094c3.383-.488 6-3.39 6-6.906 0-3.855-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zm0 1c-2.2 0-4 1.8-4 4h2c0-1.117.883-2 2-2z'
    })
  );
}
export default SvgMapPinSolid;
