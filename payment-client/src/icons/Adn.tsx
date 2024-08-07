import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAdn(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm0 3.938l-6.594 9.906H11l1.531-2.313h6.938l1.562 2.313h1.594zm0 2.406l2.844 4.25h-5.688z'
    })
  );
}
export default SvgAdn;
