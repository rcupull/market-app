import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgOdnoklassnikiSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm9 2c-1.93 0-3.5 1.57-3.5 3.5S14.07 16 16 16s3.5-1.57 3.5-3.5S17.93 9 16 9zm0 2c.827 0 1.5.673 1.5 1.5S16.827 14 16 14s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5zm-3.14 5.01a1 1 0 00-.46 1.79c.698.526 1.494.871 2.334 1.052l-2.441 2.441a.999.999 0 101.414 1.414L16 20.414l2.293 2.293a.997.997 0 001.414 0 .999.999 0 000-1.414l-2.441-2.441A5.94 5.94 0 0019.6 17.8c.44-.332.53-.96.199-1.4a.998.998 0 00-1.4-.2c-1.394 1.047-3.408 1.045-4.8 0a.994.994 0 00-.74-.191z'
    })
  );
}
export default SvgOdnoklassnikiSquare;
