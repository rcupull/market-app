import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEthernetSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h18v18H7zm7 4v3h-3v7h2v-2h2v2h2v-2h2v2h2v-7h-3v-3z'
    })
  );
}
export default SvgEthernetSolid;
