import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTableSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5zm2 2h5v5H7zm7 0h4v5h-4zm6 0h5v5h-5zM7 14h5v4H7zm7 0h4v4h-4zm6 0h5v4h-5zM7 20h5v5H7zm7 0h4v5h-4zm6 0h5v5h-5z'
    })
  );
}
export default SvgTableSolid;
