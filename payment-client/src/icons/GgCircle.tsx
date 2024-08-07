import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGgCircle(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm2.545 4.486L14.69 13.34l3.965 3.967 1.254-1.254-2.728-2.717 1.361-1.361 3.967 3.966-3.967 3.965-.57-.568-1.239 1.252 1.809 1.808L25 15.945l-6.455-6.459zm-5.088.112L7 16.055l6.457 6.457 3.852-3.862-3.965-3.966-1.254 1.254 2.728 2.716-1.367 1.366-3.965-3.965 3.965-3.967.57.57 1.245-1.244-1.809-1.816z'
    })
  );
}
export default SvgGgCircle;
