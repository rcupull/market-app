import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChessBoardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 4v3h3V4H7zm3 3v3h3V7h-3zm3 0h3V4h-3v3zm3 0v3h3V7h-3zm3 0h3V4h-3v3zm3 0v3h3V7h-3zm3 0h3V4h-3v3zm0 3v3h3v-3h-3zm0 3h-3v3h3v-3zm0 3v3h3v-3h-3zm0 3h-3v3h3v-3zm0 3v3h3v-3h-3zm0 3h-3v3h3v-3zm-3 0v-3h-3v3h3zm-3 0h-3v3h3v-3zm-3 0v-3h-3v3h3zm-3 0h-3v3h3v-3zm-3 0v-3H7v3h3zm-3 0H4v3h3v-3zm0-3v-3H4v3h3zm0-3h3v-3H7v3zm0-3v-3H4v3h3zm0-3h3v-3H7v3zm0-3V7H4v3h3zm3 3v3h3v-3h-3zm3 0h3v-3h-3v3zm3 0v3h3v-3h-3zm3 0h3v-3h-3v3zm0 3v3h3v-3h-3zm0 3h-3v3h3v-3zm-3 0v-3h-3v3h3zm-3 0h-3v3h3v-3z'
    })
  );
}
export default SvgChessBoardSolid;
