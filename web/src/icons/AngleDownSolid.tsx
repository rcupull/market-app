import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleDownSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M4.219 10.781L2.78 12.22l12.5 12.5.719.687.719-.687 12.5-12.5-1.438-1.438L16 22.562z',
    }),
  );
}
export default SvgAngleDownSolid;
