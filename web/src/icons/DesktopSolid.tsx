import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDesktopSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M2 6v18h13v2h-5v2h12v-2h-5v-2h13V6zm2 2h24v14H4z' }),
  );
}
export default SvgDesktopSolid;
