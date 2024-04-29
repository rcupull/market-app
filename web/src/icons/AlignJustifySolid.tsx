import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAlignJustifySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3 7v2h26V7zm0 4v2h26v-2zm0 4v2h26v-2zm0 4v2h26v-2zm0 4v2h26v-2z',
    }),
  );
}
export default SvgAlignJustifySolid;
