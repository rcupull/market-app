import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngular(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.936L4.361 8.168 6.45 23.84 16 29.145l9.55-5.307 2.089-15.67L16 3.936zm0 2.128l9.443 3.434-1.744 13.08L16 26.855l-7.7-4.277-1.743-13.08L16 6.064zM16 8l-6 14h2l1.29-3h5.42L20 22h2L16 8zm0 4.55l.02.06.7 1.75L17.85 17h-3.7l1.13-2.64.7-1.75.02-.06z'
    })
  );
}
export default SvgAngular;
