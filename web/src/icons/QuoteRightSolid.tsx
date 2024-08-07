import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgQuoteRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 8v10h8c0 2.219-1.781 4-4 4v2c3.3 0 6-2.7 6-6V8zm14 0v10h8c0 2.219-1.781 4-4 4v2c3.3 0 6-2.7 6-6V8zM6 10h6v6H6zm14 0h6v6h-6z'
    })
  );
}
export default SvgQuoteRightSolid;
