import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGratipay(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-3.5 6a2.497 2.497 0 00-2.5 2.5c0 .527.156 1.035.438 1.438 0 .003.03 0 .03 0L16 22.25l5.531-6.313.032-.03c.28-.403.437-.88.437-1.407 0-1.383-1.117-2.5-2.5-2.5-1.766 0-2.188 1.688-3.5 1.688-1.313 0-1.734-1.688-3.5-1.688z'
    })
  );
}
export default SvgGratipay;
