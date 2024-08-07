import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRainbowSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5C8.28 5 2 11.28 2 19v8h2v-8C4 12.383 9.383 7 16 7s12 5.383 12 12v8h2v-8c0-7.72-6.28-14-14-14zm0 4C10.486 9 6 13.486 6 19v8h2v-8c0-4.411 3.589-8 8-8s8 3.589 8 8v8h2v-8c0-5.514-4.486-10-10-10zm0 4c-3.309 0-6 2.691-6 6v8h2v-8c0-2.206 1.794-4 4-4s4 1.794 4 4v8h2v-8c0-3.309-2.691-6-6-6z'
    })
  );
}
export default SvgRainbowSolid;
