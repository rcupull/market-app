import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgColumnsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v22h22V5zm2 2h8v18H7zm10 0h8v18h-8z' }),
  );
}
export default SvgColumnsSolid;
