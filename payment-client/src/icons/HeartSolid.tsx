import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHeartSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M22.5 5c-2.892 0-5.327 1.804-6.5 2.854C14.827 6.804 12.392 5 9.5 5 5.364 5 2 8.364 2 12.5c0 2.59 2.365 4.947 2.46 5.041L16 29.081l11.534-11.534C27.635 17.447 30 15.09 30 12.5 30 8.364 26.636 5 22.5 5z'
    })
  );
}
export default SvgHeartSolid;
