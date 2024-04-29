import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLockSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3c-3.844 0-7 3.156-7 7v3H6v16h20V13h-3v-3c0-3.844-3.156-7-7-7zm0 2c2.754 0 5 2.246 5 5v3H11v-3c0-2.754 2.246-5 5-5zM8 15h16v12H8z',
    }),
  );
}
export default SvgLockSolid;
