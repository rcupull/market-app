import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBreadSliceSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C8.822 4 4 8.43 4 12.568c0 1.446.775 2.624 2 3.145V24c0 2.206 1.794 4 4 4h12c2.206 0 4-1.794 4-4v-8.287c1.225-.521 2-1.699 2-3.145C28 8.43 23.178 4 16 4zm0 2c6.438 0 10 3.883 10 6.568 0 .768-.433 1.295-1.156 1.409L24 14.11V24c0 1.103-.897 2-2 2H10c-1.103 0-2-.897-2-2v-9.889l-.844-.132C6.433 13.864 6 13.336 6 12.569 6 9.882 9.562 6 16 6z'
    })
  );
}
export default SvgBreadSliceSolid;
