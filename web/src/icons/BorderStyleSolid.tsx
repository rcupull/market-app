import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBorderStyleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h4v-2H7V7h18v2h2V5H5zm20 6v4h2v-4h-2zm0 6v4h2v-4h-2zm0 6v2h-2v2h4v-4h-2zm-14 2v2h4v-2h-4zm6 0v2h4v-2h-4z',
    }),
  );
}
export default SvgBorderStyleSolid;
