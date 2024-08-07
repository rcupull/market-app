import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSortUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 8.594l-.719.687-10 10L3.594 21h24.812l-1.687-1.719-10-10zm0 2.844L23.563 19H8.438z'
    })
  );
}
export default SvgSortUpSolid;
