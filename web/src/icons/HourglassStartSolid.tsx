import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHourglassStartSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 4v2h2v4a7.001 7.001 0 003.406 6A7.001 7.001 0 009 22v4H7v2h18v-2h-2v-4a7.001 7.001 0 00-3.406-6A7.001 7.001 0 0023 10V6h2V4zm4 2h10v4c0 2.773-2.227 5-5 5s-5-2.227-5-5zm1 2v2c0 2.21 1.79 4 4 4s4-1.79 4-4V8zm4 9c2.773 0 5 2.227 5 5v4H11v-4c0-2.773 2.227-5 5-5z'
    })
  );
}
export default SvgHourglassStartSolid;
