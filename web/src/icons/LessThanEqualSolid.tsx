import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLessThanEqualSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M26 5L6 13.219v1.562L26 23v-2.156L9.469 14 26 7.156zM6 25v2h20v-2z'
    })
  );
}
export default SvgLessThanEqualSolid;
