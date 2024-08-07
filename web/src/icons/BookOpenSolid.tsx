import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBookOpenSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 6v19h10c1.102 0 2 .898 2 2h2c0-1.102.898-2 2-2h10V6H19a3.997 3.997 0 00-3 1.36A3.997 3.997 0 0013 6zm2 2h8c1.102 0 2 .898 2 2h2c0-1.102.898-2 2-2h8v15h-8a3.997 3.997 0 00-3 1.36A3.997 3.997 0 0013 23H5zm10 4v2h2v-2zm0 4v2h2v-2zm0 4v2h2v-2z'
    })
  );
}
export default SvgBookOpenSolid;
