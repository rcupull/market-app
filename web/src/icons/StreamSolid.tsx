import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStreamSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v6h19V5H5zm2 2h15v2H7V7zm2 6v6h19v-6H9zm2 2h15v2H11v-2zm-6 6v6h19v-6H5zm2 2h15v2H7v-2z'
    })
  );
}
export default SvgStreamSolid;
