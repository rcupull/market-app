import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUndoAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C12 3 8.4 4.8 6 7.7V4H4v8h8v-2H6.8c2-3 5.3-5 9.2-5 6.1 0 11 4.9 11 11s-4.9 11-11 11S5 22.1 5 16H3c0 7.2 5.8 13 13 13s13-5.8 13-13S23.2 3 16 3z'
    })
  );
}
export default SvgUndoAltSolid;
