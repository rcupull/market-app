import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRulerHorizontalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M0 8v16h32V8zm2 2h3v7h2v-7h2v4h2v-4h2v7h2v-7h2v4h2v-4h2v7h2v-7h2v4h2v-4h3v12H2z'
    })
  );
}
export default SvgRulerHorizontalSolid;
