import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4.094l-.719.687-8.5 8.5L8.22 14.72 15 7.938V28h2V7.937l6.781 6.782 1.438-1.438-8.5-8.5z'
    })
  );
}
export default SvgArrowUpSolid;
