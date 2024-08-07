import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgKeySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M20 3c-4.945 0-9 4.055-9 9 0 .52.086.977.156 1.438L3.281 21.28 3 21.594V29h7v-3h3v-3h3v-2.969c1.18.578 2.555.969 4 .969 4.945 0 9-4.055 9-9s-4.055-9-9-9zm0 2c3.855 0 7 3.145 7 7s-3.145 7-7 7a7.356 7.356 0 01-3.406-.875l-.25-.125H14v3h-3v3H8v3H5v-4.563l7.906-7.937.375-.344-.094-.531C13.086 13.023 13 12.488 13 12c0-3.855 3.145-7 7-7zm2 3a1.999 1.999 0 100 4 1.999 1.999 0 100-4z'
    })
  );
}
export default SvgKeySolid;
