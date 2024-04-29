import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStrikethroughSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M7 6v2h8v8h-5v2h5v8h2v-8h5v-2h-5V8h8V6z' }),
  );
}
export default SvgStrikethroughSolid;
