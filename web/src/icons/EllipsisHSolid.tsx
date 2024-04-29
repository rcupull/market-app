import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEllipsisHSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M6 14a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm10 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm10 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4z',
    }),
  );
}
export default SvgEllipsisHSolid;
