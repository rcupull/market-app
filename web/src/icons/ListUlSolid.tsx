import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgListUlSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M4 5v6h6V5zm2 2h2v2H6zm6 0v2h15V7zm-8 6v6h6v-6zm2 2h2v2H6zm6 0v2h15v-2zm-8 6v6h6v-6zm2 2h2v2H6zm6 0v2h15v-2z',
    }),
  );
}
export default SvgListUlSolid;
