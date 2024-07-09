import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLessThanSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M26 6L6 15.219v1.562L26 26v-2.156L9.469 16 26 8.156z' }),
  );
}
export default SvgLessThanSolid;
