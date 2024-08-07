import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFrownSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-4.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM16 18c-2.668 0-5.02 1.336-6.469 3.344l1.625 1.156C12.246 20.984 13.992 20 16 20c2.008 0 3.754.984 4.844 2.5l1.625-1.156C21.019 19.336 18.668 18 16 18z'
    })
  );
}
export default SvgFrownSolid;
