import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBalanceScaleRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.477 5.11L7.49 6.876 3 14.734V15c0 2.757 2.243 5 5 5s5-2.243 5-5v-.266l-4.21-7.37 4.216 1.581c0 .019-.006.036-.006.055 0 1.302.839 2.402 2 2.816V24h-4v2h6V11.816a2.992 2.992 0 001.275-.884l4.715 1.834L19 19.75v.266C19 22.772 21.243 25 24 25s5-2.228 5-4.984v-.266L24 11l-5.006-1.938c0-.02.006-.04.006-.062 0-1.654-1.346-3-3-3a2.98 2.98 0 00-2.281 1.076L8.477 5.11zM16 8a1.001 1.001 0 010 2 1.001 1.001 0 010-2zm-8 2.016L10.277 14H5.723L8 10.016zm16 5.015L26.268 19h-4.536L24 15.031zM5.186 16h5.628A2.993 2.993 0 018 18c-1.302 0-2.4-.838-2.814-2zm15.994 5h5.64A2.993 2.993 0 0124 23.016 2.993 2.993 0 0121.18 21z'
    })
  );
}
export default SvgBalanceScaleRightSolid;
