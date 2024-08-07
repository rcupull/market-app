import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgParkingSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 5v22h20V5zm2 2h16v18H8zm4 3v12h2v-3h3c1.645 0 3-1.355 3-3v-3c0-1.645-1.355-3-3-3zm2 2h3c.566 0 1 .434 1 1v3c0 .566-.434 1-1 1h-3z'
    })
  );
}
export default SvgParkingSolid;
