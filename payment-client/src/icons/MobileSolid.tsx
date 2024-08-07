import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMobileSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11 4C9.355 4 8 5.355 8 7v18c0 1.645 1.355 3 3 3h10c1.645 0 3-1.355 3-3V7c0-1.645-1.355-3-3-3zm0 2h10c.555 0 1 .445 1 1v18c0 .555-.445 1-1 1H11c-.555 0-1-.445-1-1V7c0-.555.445-1 1-1zm5 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'
    })
  );
}
export default SvgMobileSolid;
