import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBarsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M4 7v2h24V7zm0 8v2h24v-2zm0 8v2h24v-2z' }),
  );
}
export default SvgBarsSolid;
