import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGreaterThanEqualSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', { d: 'M6 5v2.156L22.531 14 6 20.844V23l20-8.219V13.22zm0 20v2h20v-2z' })
  );
}
export default SvgGreaterThanEqualSolid;
