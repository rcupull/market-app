import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMapSignsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 5v2H5v9h20.469l.281-.344 3.563-4.156-3.563-4.156L25.469 7H17V5zM7 9h17.531l2.157 2.5L24.53 14H7zm8 8v10h2V17z'
    })
  );
}
export default SvgMapSignsSolid;
