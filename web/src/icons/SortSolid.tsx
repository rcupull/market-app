import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSortSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.594l-.719.687-8 8L5.594 14h20.812l-1.687-1.719-8-8zm0 2.844L21.563 12H10.438zM5.594 18l1.687 1.719 8 8 .719.687.719-.687 8-8L26.406 18zm4.843 2h11.126L16 25.563z'
    })
  );
}
export default SvgSortSolid;
