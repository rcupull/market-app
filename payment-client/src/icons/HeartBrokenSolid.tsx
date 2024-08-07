import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHeartBrokenSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9.5 4C5.362 4 2 7.404 2 11.5c0 1.428.652 2.653 1.252 3.549.6.895 1.213 1.496 1.213 1.496L16 28.082l11.535-11.537S30 14.357 30 11.5C30 7.404 26.638 4 22.5 4c-1.57 0-2.973.523-4.11 1.148l-.33.182L16.005 11h3.621L16 17.215V13h-3.547l1.545-7.64-.672-.346C12.25 4.459 10.952 4 9.5 4zm0 2c.778 0 1.496.309 2.207.602L10.007 15H14v6h2.11L22 10.895V9h-3.145l.793-2.184C20.522 6.374 21.486 6 22.5 6c3.042 0 5.5 2.496 5.5 5.5 0 1.545-1.87 3.621-1.87 3.621l-.001.002L16 25.252 5.871 15.123l-.002-.002s-.472-.464-.955-1.185C4.431 13.214 4 12.272 4 11.5 4 8.496 6.458 6 9.5 6z'
    })
  );
}
export default SvgHeartBrokenSolid;
