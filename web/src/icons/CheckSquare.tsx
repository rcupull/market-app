import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCheckSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm14.281 4.281L14 18.562l-3.281-3.28-1.438 1.437 4 4 .719.687.719-.687 8-8z',
    }),
  );
}
export default SvgCheckSquare;
