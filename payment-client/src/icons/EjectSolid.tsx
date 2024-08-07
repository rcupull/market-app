import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEjectSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 6.594l-.719.687-9 9L4.594 18h22.812l-1.687-1.719-9-9zm0 2.843L22.563 16H9.438zM4 22v2h24v-2z'
    })
  );
}
export default SvgEjectSolid;
