import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVectorSquareSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v7h2v8H5v7h7v-2h8v2h7v-7h-2v-8h2V5h-7v2h-8V5H5zm2 2h3v3H7V7zm15 0h3v3h-3V7zM12 9h8v3h3v8h-3v3h-8v-3H9v-8h3V9zM7 22h3v3H7v-3zm15 0h3v3h-3v-3z'
    })
  );
}
export default SvgVectorSquareSolid;
