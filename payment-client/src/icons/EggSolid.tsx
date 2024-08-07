import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEggSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3c-3 0-5.7 2.3-7.7 5.2C6.3 11.1 5 14.7 5 18c0 3.5 1.2 6.3 3.2 8.2C10.3 28 13 29 16 29s5.7-.9 7.8-2.8S27 21.5 27 18c0-3.3-1.3-6.9-3.3-9.8C21.7 5.3 19 3 16 3zm0 2c1.9 0 4.2 1.7 6 4.3 1.8 2.6 3 6 3 8.7 0 3.1-1 5.3-2.6 6.7-1.6 1.5-3.8 2.3-6.4 2.3-2.6 0-4.8-.8-6.4-2.3C8 23.2 7 21 7 18c0-2.8 1.2-6.1 3-8.7C11.8 6.7 14.1 5 16 5z'
    })
  );
}
export default SvgEggSolid;
