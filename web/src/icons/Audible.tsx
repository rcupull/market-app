import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAudible(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 8c-5.078 0-9.465 2.918-11.602 7.16C6.668 12.04 10.344 10 14.5 10c4.54 0 8.504 2.43 10.691 6.05l2.29-1.144C25.296 10.801 20.976 8 16 8zm0 4a9.001 9.001 0 00-8.27 5.45C9.273 15.36 11.742 14 14.531 14c2.961 0 5.563 1.531 7.078 3.844l2.297-1.153A8.999 8.999 0 0016 12zM1 15.379v2.238c5.223 2.61 14.55 7.278 14.55 7.278l.45.222 15-7.5v-2.234l-15 7.5c-8.309-4.156-12.688-6.344-15-7.504zM15.969 16c-2.196 0-4.035 1.434-4.7 3.414A4.444 4.444 0 0114.517 18a4.44 4.44 0 013.453 1.66l2.297-1.148C19.406 17.02 17.816 16 15.969 16z'
    })
  );
}
export default SvgAudible;
