import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWindowRestoreSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm5 2v4H9v10h11v-4h3V9zm2 2h7v1h-7zm0 3h7v3h-7zm-3 1h1v1.031h-1zm0 3.031h1V19h6v2h-7z'
    })
  );
}
export default SvgWindowRestoreSolid;
