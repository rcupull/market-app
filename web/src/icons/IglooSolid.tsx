import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgIglooSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 6C8.832 6 3 11.832 3 19v7h26v-7c0-7.168-5.832-13-13-13zm0 2c.338 0 .67.02 1 .05V12H7.523c2.02-2.44 5.07-4 8.477-4zm3 .428A11.019 11.019 0 0124.477 12H19V8.428zM6.215 14H8v5H5c0-1.801.444-3.498 1.215-5zM10 14h12v5h-1.422A5.004 5.004 0 0016 16a5.004 5.004 0 00-4.578 3H10v-5zm14 0h1.785A10.917 10.917 0 0127 19h-3v-5zm-8 4c1.654 0 3 1.346 3 3v3h-6v-3c0-1.654 1.346-3 3-3zM5 21h6v3H5v-3zm16 0h6v3h-6v-3z',
    })
  );
}
export default SvgIglooSolid;
