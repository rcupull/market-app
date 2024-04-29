import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3 6v20h26V6zm2 2h4v4H5zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zM5 14h4v4H5zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zM5 20h4v4H5zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4z',
    }),
  );
}
export default SvgThSolid;
