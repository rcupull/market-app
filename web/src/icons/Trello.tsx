import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTrello(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v22h22V5zm2 2h8v14H7zm10 0h8v9h-8z' }),
  );
}
export default SvgTrello;
