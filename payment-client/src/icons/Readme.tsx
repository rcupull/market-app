import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgReadme(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 6C3.346 6 2 7.346 2 9v12c0 1.654 1.346 3 3 3l6.184-.02c.99 0 1.949.31 2.773.86L16 26.2l2.043-1.361a4.988 4.988 0 012.773-.84H27c1.654 0 3-1.346 3-3V9c0-1.654-1.346-3-3-3h-6.184c-1.386 0-2.73.408-3.882 1.176L16 7.799l-.934-.623A6.978 6.978 0 0011.184 6H5zm0 2h6.184c.99 0 1.949.29 2.773.84L16 10.2l2.043-1.361A4.988 4.988 0 0120.816 8H27c.552 0 1 .449 1 1v12c0 .551-.448 1-1 1h-6.184c-1.386 0-2.73.408-3.882 1.176l-.934.623-.934-.623A6.978 6.978 0 0011.184 22H5c-.552 0-1-.449-1-1V9c0-.551.448-1 1-1zm1 4v2h8v-2H6zm12 0v2h8v-2h-8zM6 16v2h8v-2H6zm12 0v2h8v-2h-8z'
    })
  );
}
export default SvgReadme;
