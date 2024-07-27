import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWindowMaximize(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm2 3v12h14V10zm2 2h10v2H11zm0 4h10v4H11z',
    }),
  );
}
export default SvgWindowMaximize;
