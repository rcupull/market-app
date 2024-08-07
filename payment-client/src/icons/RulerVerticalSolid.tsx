import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRulerVerticalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8 0v32h16V0H8zm2 2h12v3h-7v2h7v2h-4v2h4v2h-7v2h7v2h-4v2h4v2h-7v2h7v2h-4v2h4v3H10V2z'
    })
  );
}
export default SvgRulerVerticalSolid;
