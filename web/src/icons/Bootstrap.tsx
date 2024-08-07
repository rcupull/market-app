import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBootstrap(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm4 3v11.99c5.93 0 7.117.08 8.227-.25.65-.2 2.43-.84 2.43-3.09 0-1-.3-2.69-2.26-3.11v-.03h-.37c1-.45 1.63-1.3 1.63-2.55 0-.32.09-2.96-3.41-2.96H11zm2 2h4c1.509 0 1.656.853 1.656 1.49C18.656 15.044 17.03 15 17 15h-4v-3zm0 5h4.76c1.86 0 1.896 1.176 1.896 1.48 0 1.56-1.611 1.52-1.806 1.52H13v-3z'
    })
  );
}
export default SvgBootstrap;
