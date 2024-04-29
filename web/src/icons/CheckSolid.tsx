import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCheckSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M28.281 6.281L11 23.563 3.719 16.28 2.28 17.72l8 8 .719.687.719-.687 18-18z',
    }),
  );
}
export default SvgCheckSolid;
