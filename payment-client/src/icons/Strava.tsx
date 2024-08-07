import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStrava(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.18 2L5.9 18h4.88l3.4-6.38L17.56 18h4.84L14.18 2zm8.22 16L20 22.79 17.56 18h-3.7L20 30l6.1-12h-3.7z'
    })
  );
}
export default SvgStrava;
