import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTwitterSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm11.69 3.629c-1.75 0-3.208 1.578-2.801 3.525a8.143 8.143 0 01-5.914-3 2.832 2.832 0 00-.39 1.448 2.866 2.866 0 001.278 2.388 2.866 2.866 0 01-1.295-.361v.033a2.87 2.87 0 002.297 2.818 3.072 3.072 0 01-1.295.053 2.871 2.871 0 002.682 1.99 5.75 5.75 0 01-3.56 1.225A6.11 6.11 0 019 20.715 8.125 8.125 0 0013.406 22c5.276 0 8.164-4.371 8.164-8.164 0-.123 0-.248-.01-.371a6.015 6.015 0 001.438-1.488 5.692 5.692 0 01-1.652.447 2.86 2.86 0 001.26-1.58 5.641 5.641 0 01-1.82.691 2.86 2.86 0 00-2.097-.906z'
    })
  );
}
export default SvgTwitterSquare;
