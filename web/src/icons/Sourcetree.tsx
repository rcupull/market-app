import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSourcetree(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C10.486 4 6 8.486 6 14c0 3.983 2.383 7.577 6 9.156V28h8v-4.844c3.617-1.579 6-5.173 6-9.156 0-5.514-4.486-10-10-10zm0 2c4.411 0 8 3.589 8 8a8.014 8.014 0 01-5.334 7.535L18 21.77V26h-4v-4.23l-.666-.237A8.01 8.01 0 018 14c0-4.411 3.589-8 8-8zm0 4c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 2c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z'
    })
  );
}
export default SvgSourcetree;
