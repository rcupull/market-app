import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWalletSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M22.969 4a2.177 2.177 0 00-.469.063L6.25 8.343A3.024 3.024 0 004 11.25V25c0 1.645 1.355 3 3 3h18c1.645 0 3-1.355 3-3V12c0-1.645-1.355-3-3-3H11.625L23 6v2h2V6c0-1.125-.957-2.016-2.031-2zM7 11h18c.566 0 1 .434 1 1v13c0 .566-.434 1-1 1H7c-.566 0-1-.434-1-1V12c0-.566.434-1 1-1zm15.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z',
    })
  );
}
export default SvgWalletSolid;
