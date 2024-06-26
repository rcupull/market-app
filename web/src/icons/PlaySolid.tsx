import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPlaySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9 5.156v21.688l1.531-1L25.844 16 10.53 6.156zm2 3.657L22.156 16 11 23.188z',
    })
  );
}
export default SvgPlaySolid;
