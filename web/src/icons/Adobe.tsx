import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAdobe(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M4 6v20l8.9-20H4zm15.1 0L28 26V6h-8.9zM16 13.4L12.1 22h4.097l1.6 4H21.6L16 13.4z',
    }),
  );
}
export default SvgAdobe;
