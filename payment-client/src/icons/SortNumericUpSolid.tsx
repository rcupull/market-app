import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSortNumericUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.59 5l-.15.78s-.17.58-.56 1.16C7.48 7.52 6.98 8 6 8v2c1.38 0 2.32-.68 3-1.41V15h2V5H8.59zM23 5.5l-.72.69L18 10.5l1.41 1.41L22 9.31V28h2V9.31l2.59 2.6L28 10.5l-4.28-4.31L23 5.5zM8.5 17C6.58 17 5 18.58 5 20.5v.5h2v-.5c0-.88.62-1.5 1.5-1.5h1c.88 0 1.5.62 1.5 1.5 0 .46-.35.98-.94 1.34-1.23.76-2.31 1.25-3.22 1.75-.45.26-.86.5-1.22.88-.35.38-.62.95-.62 1.53v1h8v-2H8.44c.73-.38 1.58-.76 2.68-1.44 1.02-.63 1.88-1.72 1.88-3.06 0-1.92-1.58-3.5-3.5-3.5h-1z'
    })
  );
}
export default SvgSortNumericUpSolid;
