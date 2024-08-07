import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGofore(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17 4C10.373 4 5 9.373 5 16s5.373 12 12 12c3.585 0 6.782-1.592 8.979-4.086-.116-1.795-1.489-3.837-3.979-3.902v.853C20.729 22.175 18.964 23 17 23c-3.86 0-7-3.14-7-7s3.14-7 7-7a6.97 6.97 0 014.457 1.607l3.506-3.568A11.943 11.943 0 0017 4zm-1 9v5h6c2.21 0 3.418.796 4 2 0-2.631.002-7-4-7h-6z'
    })
  );
}
export default SvgGofore;
