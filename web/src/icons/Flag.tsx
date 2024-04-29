import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFlag(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v24h2V19h8v3h12V8H17V5zm2 2h8v10H7zm10 3h8v10h-8z' }),
  );
}
export default SvgFlag;
