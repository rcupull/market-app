import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWindowMinimize(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v22h22V5zm2 2h18v18H7zm2 13v2h14v-2z' }),
  );
}
export default SvgWindowMinimize;
