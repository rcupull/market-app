import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGreaterThanSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M6 6v2.156L22.531 16 6 23.844V26l20-9.219V15.22z' }),
  );
}
export default SvgGreaterThanSolid;
