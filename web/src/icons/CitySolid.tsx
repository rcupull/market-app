import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCitySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M10 3.883l-7 3.5V28h26V10H17V7.383l-7-3.5zm0 2.234l5 2.5V26H5V8.617l5-2.5zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm6 2h10v14H17V12zM7 14v2h2v-2H7zm4 0v2h2v-2h-2zm8 0v2h2v-2h-2zm4 0v2h2v-2h-2zM7 18v2h2v-2H7zm4 0v2h2v-2h-2zm8 0v2h2v-2h-2zm4 0v2h2v-2h-2zM7 22v2h2v-2H7zm4 0v2h2v-2h-2zm8 0v2h2v-2h-2zm4 0v2h2v-2h-2z',
    }),
  );
}
export default SvgCitySolid;
