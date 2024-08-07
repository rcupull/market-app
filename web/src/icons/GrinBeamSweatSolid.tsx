import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGrinBeamSweatSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13c0-2.054-.492-3.992-1.344-5.72a4.417 4.417 0 01-1.4 1.773C26.73 13.28 27 14.608 27 16c0 6.065-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5c1.351 0 2.64.256 3.838.703.26-.592.56-1.2.877-1.805A12.923 12.923 0 0016 3zm7.5 0S21 7.275 21 8.6c0 1.325 1.12 2.4 2.5 2.4S26 9.925 26 8.6 23.5 3 23.5 3zM9 14v2h5v-2H9zm9 0v2h5v-2h-5z'
    })
  );
}
export default SvgGrinBeamSweatSolid;
