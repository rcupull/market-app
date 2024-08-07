import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSortAlphaUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.19 5l-.22.66L6.03 11H6v.06l-.94 2.6-.06.15V15h2v-.84L7.41 13h3.18l.41 1.16V15h2v-1.19l-.06-.15-.94-2.6V11h-.03l-1.94-5.34L9.81 5H8.19zM23 5.5l-.72.69L18 10.5l1.41 1.41L22 9.31V28h2V9.31l2.59 2.6L28 10.5l-4.28-4.31L23 5.5zM9 8.66L9.84 11H8.16L9 8.66zM5 17v2h5.56l-5.28 5.28-.28.31V27h8v-2H7.44l5.28-5.28.28-.31V17H5z'
    })
  );
}
export default SvgSortAlphaUpSolid;
