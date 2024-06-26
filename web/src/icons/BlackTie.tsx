import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBlackTie(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm5 2l2.813 3.625L12 20.375 16 24l4-3.625-2.813-7.75L20 9z',
    })
  );
}
export default SvgBlackTie;
