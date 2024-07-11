import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStarHalfSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 2.133l-4.164 9.34-10.172 1.074 7.598 6.848L7.14 29.398 16 24.29z',
    }),
  );
}
export default SvgStarHalfSolid;
