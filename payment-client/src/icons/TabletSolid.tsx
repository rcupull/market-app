import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTabletSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 6C3.355 6 2 7.355 2 9v14c0 1.645 1.355 3 3 3h22c1.645 0 3-1.355 3-3V9c0-1.645-1.355-3-3-3zm0 2h22c.555 0 1 .445 1 1v14c0 .555-.445 1-1 1H5c-.555 0-1-.445-1-1V9c0-.555.445-1 1-1zm1 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'
    })
  );
}
export default SvgTabletSolid;
