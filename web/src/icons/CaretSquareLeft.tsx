import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCaretSquareLeft(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm10.781 2.281l-6 6-.687.719.687.719 6 6 1.438-1.438L13.937 16l5.282-5.281z',
    }),
  );
}
export default SvgCaretSquareLeft;
