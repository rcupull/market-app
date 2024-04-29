import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThLargeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v22h22V5zm2 2h8v8H7zm10 0h8v8h-8zM7 17h8v8H7zm10 0h8v8h-8z' }),
  );
}
export default SvgThLargeSolid;
