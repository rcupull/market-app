import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserClockSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5.1c-3.9 0-7 3.1-7 7 0 2.4 1.2 4.6 3.1 5.8C8.5 19.3 6 22.9 6 27h2c0-4.4 3.6-8 8-8 .6 0 1.1.1 1.6.2.046-.063.107-.117.156-.179A7.95 7.95 0 0016 24c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8a7.92 7.92 0 00-2.541.424A6.957 6.957 0 0016 5.1zM16 7c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm3.275 10.566l-.086.063a7.53 7.53 0 01.086-.063zM24 18c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm-5.502.215zM23 20v4.6l-1.7 1.7 1.4 1.4 2.3-2.3V20h-2z'
    })
  );
}
export default SvgUserClockSolid;
