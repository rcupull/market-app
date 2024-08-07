import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTextWidthSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8 6v2h7v14h2V8h7V6zm2 15.5L5.625 25 10 28.5V26h12v2.5l4.375-3.5L22 21.5V24H10z'
    })
  );
}
export default SvgTextWidthSolid;
