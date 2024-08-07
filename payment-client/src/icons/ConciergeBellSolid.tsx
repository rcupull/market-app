import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgConciergeBellSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M13 6v2h6V6zm3 3C9.703 9 4.574 13.84 4.062 20H2v5h28v-5h-2.063C27.427 13.84 22.297 9 16 9zm0 2a9.927 9.927 0 019.938 9H6.063c.492-5.086 4.71-9 9.937-9zM4 22h24v1H4z'
    })
  );
}
export default SvgConciergeBellSolid;
