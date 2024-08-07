import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgIndentSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 7v2h26V7zm0 4v2h19v-2zm26 0l-5 5 5 5zM3 15v2h19v-2zm0 4v2h19v-2zm0 4v2h26v-2z'
    })
  );
}
export default SvgIndentSolid;
