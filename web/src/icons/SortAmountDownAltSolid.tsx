import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSortAmountDownAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 5v2h2V5zm17 0v18.688l-2.594-2.594L17 22.5l4.281 4.313.719.687.719-.688L27 22.5l-1.406-1.406L23 23.687V5zM4 9v2h4V9zm0 4v2h6v-2zm0 4v2h8v-2zm0 4v2h10v-2zm0 4v2h12v-2z'
    })
  );
}
export default SvgSortAmountDownAltSolid;
