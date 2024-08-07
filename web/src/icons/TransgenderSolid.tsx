import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTransgenderSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M19 3v2h3.594l-4.407 4.406A6.92 6.92 0 0014 8c-3.855 0-7 3.145-7 7 0 3.516 2.617 6.418 6 6.906V25h-3v2h3v3h2v-3h3v-2h-3v-3.094c3.383-.488 6-3.39 6-6.906a6.92 6.92 0 00-1.406-4.188L24 6.407V10h2V3zm-5 7c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5z'
    })
  );
}
export default SvgTransgenderSolid;
