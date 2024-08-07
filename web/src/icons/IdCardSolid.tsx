import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgIdCardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 6C3.355 6 2 7.355 2 9v14c0 1.645 1.355 3 3 3h22c1.645 0 3-1.355 3-3V9c0-1.645-1.355-3-3-3zm0 2h22c.566 0 1 .434 1 1v14c0 .566-.434 1-1 1H5c-.566 0-1-.434-1-1V9c0-.566.434-1 1-1zm6 2c-2.2 0-4 1.8-4 4 0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 006 21h2c0-1.668 1.332-3 3-3s3 1.332 3 3h2a5.036 5.036 0 00-2.219-4.156C14.523 16.117 15 15.114 15 14c0-2.2-1.8-4-4-4zm7 1v2h8v-2zm-7 1c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm7 3v2h8v-2zm0 4v2h5v-2z'
    })
  );
}
export default SvgIdCardSolid;
