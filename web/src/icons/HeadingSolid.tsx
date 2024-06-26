import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHeadingSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M6 5v2h1v18H6v2h8v-2h-1v-6h6v6h-1v2h8v-2h-1V7h1V5h-8v2h1v6h-6V7h1V5zm3 2h2v8h10V7h2v18h-2v-8H11v8H9z',
    })
  );
}
export default SvgHeadingSolid;
