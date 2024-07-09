import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDoorClosedSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M8 5v22h16V5zm2 2h12v18H10zm10 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z',
    }),
  );
}
export default SvgDoorClosedSolid;
