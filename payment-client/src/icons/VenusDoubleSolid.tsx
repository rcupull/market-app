import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVenusDoubleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11 3c-4.41 0-8 3.59-8 8 0 4.07 3.059 7.441 7 7.938V23H6v2h4v4h2v-4h8v4h2v-4h4v-2h-4v-4.063c3.941-.496 7-3.867 7-7.937 0-4.41-3.59-8-8-8-1.52 0-2.945.45-4.156 1.188.52.445 1 .949 1.406 1.5A5.938 5.938 0 0121 5c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6c0-.797.156-1.555.438-2.25a4.979 4.979 0 00-1.407-1.688A7.942 7.942 0 0013 11c0 4.07 3.059 7.441 7 7.938V23h-8v-4.094a7.96 7.96 0 003.156-1.093c-.52-.446-1-.95-1.406-1.5A5.938 5.938 0 0111 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6c0 .797-.156 1.555-.438 2.25.336.664.82 1.234 1.407 1.688A7.942 7.942 0 0019 11c0-4.41-3.59-8-8-8z'
    })
  );
}
export default SvgVenusDoubleSolid;
