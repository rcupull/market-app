import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPortraitSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 5v22h18V5zm2 2h14v18H9zm7 3c-2.2 0-4 1.8-4 4 0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 0011 21h2c0-1.668 1.332-3 3-3s3 1.332 3 3h2a5.036 5.036 0 00-2.219-4.156C19.523 16.117 20 15.114 20 14c0-2.2-1.8-4-4-4zm0 2c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2z'
    })
  );
}
export default SvgPortraitSolid;
