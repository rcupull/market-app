import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTrainSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M14 3c-1.258 0-2.152.89-2.594 2H10c-2.75 0-5 2.25-5 5v11a6.012 6.012 0 003.531 5.469L6 29h2.344l2.031-2.031c.2.02.418.031.625.031h10c.207 0 .426-.012.625-.031L23.656 29H26l-2.531-2.531A6.012 6.012 0 0027 21V10c0-2.75-2.25-5-5-5h-1.406C20.152 3.89 19.258 3 18 3zm0 2h4c.566 0 1 .434 1 1v1h3c1.32 0 2.438.828 2.844 2H7.156A2.992 2.992 0 0110 7h3V6c0-.566.434-1 1-1zm-7 6h18v5H7zm0 7h18v3c0 2.219-1.781 4-4 4H11c-2.219 0-4-1.781-4-4zm9 1a1.999 1.999 0 100 4 1.999 1.999 0 100-4z',
    })
  );
}
export default SvgTrainSolid;
