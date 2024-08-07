import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFilterSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 4v2.344l.219.281L13 16.344V28l1.594-1.188 4-3L19 23.5v-7.156l7.781-9.719.219-.281V4zm2.281 2H24.72l-7.188 9H14.47zM15 17h2v5.5L15 24z'
    })
  );
}
export default SvgFilterSolid;
