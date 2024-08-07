import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBalanceScaleLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M23.523 5.11l-5.242 1.966A2.98 2.98 0 0016 6c-1.654 0-3 1.346-3 3 0 .021.005.041.006.063L8 11l-5 8.75v.266C3 22.772 5.243 25 8 25s5-2.228 5-4.984v-.266l-3.99-6.984 4.715-1.834c.338.398.773.705 1.275.884V26h6v-2h-4V11.816A2.997 2.997 0 0019 9c0-.019-.006-.036-.006-.055l4.217-1.582L19 14.734V15c0 2.757 2.243 5 5 5s5-2.243 5-5v-.266l-4.49-7.857-.987-1.768zM16 8a1.001 1.001 0 010 2 1.001 1.001 0 010-2zm8 2.016L26.277 14h-4.554L24 10.016zM8 15.03L10.268 19H5.732L8 15.031zM21.186 16h5.628A2.993 2.993 0 0124 18c-1.302 0-2.4-.838-2.814-2zM5.18 21h5.64A2.996 2.996 0 018 23.016 2.996 2.996 0 015.18 21z'
    })
  );
}
export default SvgBalanceScaleLeftSolid;
