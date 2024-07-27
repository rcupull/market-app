import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGripLinesSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M3 11v2h26v-2H3zm0 8v2h26v-2H3z' }),
  );
}
export default SvgGripLinesSolid;
