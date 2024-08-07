import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgNeos(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.287 5L6 6.701V26h4.662l3.342-2.443-.002-4.034L18.367 26h3.42L25 24V5h-4.662L17 7.42v3.93L12.768 5h-4.48zM9.39 6h2.843L21 19.15V6h3v17h-3.28L9.39 6zm-1.06.215L20.185 24h2.855l-1.566 1h-2.49L14 17.748v-.014h-.01L10 11.93v10.32L7 24.5V7.203l1.328-.988zM20 6.48v9.37l-2-3V7.93l2-1.45zm-9 8.59l2 2.967.004 5.012L10.338 25H8l3-2.25v-7.68z'
    })
  );
}
export default SvgNeos;
