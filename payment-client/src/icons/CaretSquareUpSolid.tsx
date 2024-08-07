import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCaretSquareUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm9 4.094l-.719.687-6 6 1.438 1.438L16 13.937l5.281 5.282 1.438-1.438-6-6z'
    })
  );
}
export default SvgCaretSquareUpSolid;
