import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCaretSquareRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72 18.062 16l-5.28 5.281 1.437 1.438 6-6 .687-.719-.687-.719z'
    })
  );
}
export default SvgCaretSquareRightSolid;
