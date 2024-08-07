import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTerminalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 5v22h24V5zm2 2h20v2H6zm0 4h20v14H6zm5.219 2.781L9.78 15.22 12.562 18l-2.78 2.781 1.437 1.438 3.5-3.5.687-.719-.687-.719zM16 20v2h6v-2z'
    })
  );
}
export default SvgTerminalSolid;
