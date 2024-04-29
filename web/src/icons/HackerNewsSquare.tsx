import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHackerNewsSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v22h22V5zm2 2h18v18H7zm4 3l4 7v5h2v-5l4-7h-2l-3 5.25L13 10z' }),
  );
}
export default SvgHackerNewsSquare;
