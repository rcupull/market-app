import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgQuoteLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.219 1.781-4 4-4zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.219 1.781-4 4-4zM6 16h6v6H6zm14 0h6v6h-6z'
    })
  );
}
export default SvgQuoteLeftSolid;
