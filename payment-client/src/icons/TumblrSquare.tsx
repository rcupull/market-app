import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTumblrSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm8 3c0 1.657-.895 3-2 3v2h1v3.365A3.635 3.635 0 0017.635 22a3.177 3.177 0 002.369-.9l-.717-2.114-.853.38A1.02 1.02 0 0117 18.433V15h2v-2h-2v-3h-2z'
    })
  );
}
export default SvgTumblrSquare;
