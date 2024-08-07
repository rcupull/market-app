import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHryvniaSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.21 5c-.99 0-1.948.29-2.773.84L9.445 7.168l1.11 1.664 1.992-1.328A2.99 2.99 0 0114.21 7h4.385a2.407 2.407 0 011.539 4.254L19.24 12H8v2h8.84l-3.602 3H8v2h2.84l-.254.21A4.398 4.398 0 009 22.597 4.409 4.409 0 0013.404 27h4.385c.99 0 1.95-.29 2.773-.84l1.993-1.328-1.11-1.664-1.992 1.328A2.99 2.99 0 0117.79 25h-4.385a2.407 2.407 0 01-1.539-4.254L13.961 19H24v-2h-7.639l3.6-3H24v-2h-1.85A4.39 4.39 0 0023 9.404 4.409 4.409 0 0018.596 5H14.21z'
    })
  );
}
export default SvgHryvniaSolid;
