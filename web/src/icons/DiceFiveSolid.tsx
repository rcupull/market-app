import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDiceFiveSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm4 2a2 2 0 000 4 2 2 0 000-4zm10 0a2 2 0 000 4 2 2 0 000-4zm-5 5a2 2 0 000 4 2 2 0 000-4zm-5 5a2 2 0 000 4 2 2 0 000-4zm10 0a2 2 0 000 4 2 2 0 000-4z'
    })
  );
}
export default SvgDiceFiveSolid;
