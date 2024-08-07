import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCentercode(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-2.8 4c-2.355 2.26-2.821 7.59-1.391 13.87 2.82.63 6.91-1.07 11.08-4.44 1.137-4.75-6.555-8.29-9.69-9.43zm2.8 5a2 2 0 11.001 3.999A2 2 0 0116 14z'
    })
  );
}
export default SvgCentercode;
