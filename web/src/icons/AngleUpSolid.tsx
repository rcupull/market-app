import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 6.594l-.719.687-12.5 12.5L4.22 21.22 16 9.437 27.781 21.22l1.438-1.438-12.5-12.5z',
    }),
  );
}
export default SvgAngleUpSolid;
