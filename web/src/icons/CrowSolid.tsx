import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCrowSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 6a4 4 0 00-4 4v5c0 4.079 3.055 7.439 7 7.932V27h2v-4h2v4h2v-4h6.385l3.078 2h4L11 13v-3h4c0-1.657-2.204-3-4-3H9.62A3.966 3.966 0 007 6zm0 2c.202 0 .392.04.576.096A1 1 0 008 10a1 1 0 00.904-.576C8.96 9.608 9 9.798 9 10v4.086l.91.59L19.64 21H11c-3.308 0-6-2.692-6-6v-5c0-1.103.897-2 2-2z'
    })
  );
}
export default SvgCrowSolid;
