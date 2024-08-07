import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgServicestack(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10 6c1.544 1.76 2.276 4.15 2.217 6.61 3.968 1.67 9.924 6.12 11.181 12.39H28C26.051 14.31 14.918 6.77 10 6zm-2 7c4.67 4.913.81 11.582-4 12h18.97C21.5 18.289 11.95 13.533 8 13z'
    })
  );
}
export default SvgServicestack;
