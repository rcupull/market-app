import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLaughSquint(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-5.945 6.168l-1.11 1.664L10.697 14l-1.752 1.168 1.11 1.664L14.303 14l-4.248-2.832zm11.89 0L17.697 14l4.248 2.832 1.11-1.664L21.303 14l1.752-1.168-1.11-1.664zM9 19s1.605 5 7 5 7-5 7-5H9z'
    })
  );
}
export default SvgLaughSquint;
