import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMagnetSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5C9.937 5 5 9.938 5 16v11h8V16c0-1.668 1.332-3 3-3s3 1.332 3 3v11h8V16c0-6.063-4.938-11-11-11zm0 2c4.984 0 9 4.016 9 9v5h-4v-5c0-2.75-2.25-5-5-5s-5 2.25-5 5v5H7v-5c0-4.984 4.016-9 9-9zM7 23h4v2H7zm14 0h4v2h-4z'
    })
  );
}
export default SvgMagnetSolid;
