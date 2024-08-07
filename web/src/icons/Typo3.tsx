import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTypo3(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11.7 6.5c.1 2.5 1.5 6.5 2.9 9.5 1.8 3.8 3.4 5.6 4.7 6.5C17 25.6 15 27 14.4 27s-2.6-1.5-5-6.3C7.4 16.8 6 12.4 6 9.9c0-.5.1-.8.1-.9.8-.8 2.9-1.8 5.6-2.5M14.4 4c-3.9.5-8.4 1.9-9.9 3.8-.3.4-.5 1.1-.5 2.1C4 15.7 10 29 14.4 29c2 0 5.5-3.4 8.3-7.9-.4.1-.7.1-1.1.1-3.2 0-7.9-11.3-7.9-15 0-1.4.3-1.8.7-2.2zm5.9 2c4.4 0 5.5.8 5.7 1 0 3.3-1.7 6.7-2.6 7.8C22.1 13.6 20 9 20 6h.3m0-2c-1.7 0-2.3.3-2.3 2 0 3.7 3 11 5.6 11 1.5 0 4.4-5.5 4.4-10.1C28 4.6 24.3 4 20.3 4z'
    })
  );
}
export default SvgTypo3;
