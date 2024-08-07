import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCookieSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-2 4a1 1 0 000 2 1 1 0 000-2zm5.5 1a1.5 1.5 0 000 3 1.5 1.5 0 000-3zM11 13a2 2 0 000 4 2 2 0 000-4zm6 2a1 1 0 000 2 1 1 0 000-2zm5 1a1 1 0 000 2 1 1 0 000-2zm-9.5 3a1.5 1.5 0 000 3 1.5 1.5 0 000-3zm7 1a1.5 1.5 0 000 3 1.5 1.5 0 000-3z'
    })
  );
}
export default SvgCookieSolid;
