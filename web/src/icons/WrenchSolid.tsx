import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWrenchSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M21 4c-3.855 0-7 3.145-7 7 0 .715.215 1.363.414 2.016l-9.469 9.468a3.244 3.244 0 000 4.575 3.247 3.247 0 004.57 0l9.47-9.47c.648.2 1.3.411 2.015.411 3.855 0 7-3.145 7-7 0-1.027-.227-2-.625-2.875l-.594-1.32-1.02 1.023L22.587 11H21V9.414l4.195-4.195-1.32-.594A6.92 6.92 0 0021 4zm0 2c.172 0 .316.086.484.102L19 8.586V13h4.414l2.48-2.484c.02.168.106.312.106.484 0 2.773-2.227 5-5 5a5.01 5.01 0 01-1.969-.402l-.62-.266L8.1 25.641a1.226 1.226 0 01-1.742 0 1.23 1.23 0 010-1.746L16.668 13.59l-.266-.625A4.99 4.99 0 0116 11c0-2.773 2.227-5 5-5z'
    })
  );
}
export default SvgWrenchSolid;
