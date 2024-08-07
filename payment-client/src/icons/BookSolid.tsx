import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBookSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 4C7.355 4 6 5.355 6 7v18c0 1.645 1.355 3 3 3h17V4zm0 2h15v16H9a2.95 2.95 0 00-1 .188V7c0-.566.434-1 1-1zm2 3v2h11V9zM9 24h15v2H9c-.566 0-1-.434-1-1 0-.566.434-1 1-1z'
    })
  );
}
export default SvgBookSolid;
