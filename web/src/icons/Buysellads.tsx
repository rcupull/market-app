import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBuysellads(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11.188 6l-.22.688-5.905 18L4.625 26h7.344l.281-.219L18.125 21l1.156 4.25.219.75h7.906l-.468-1.313-6.063-18-.25-.687zm1.468 2h6.531l5.438 16H21L17.062 9.469l-.187-.75h-1.719l-.219.719-2.656 9.28L11.906 20h4.281l-4.906 4H7.375zm3.313 5.094L17.313 18h-2.75z'
    })
  );
}
export default SvgBuysellads;
