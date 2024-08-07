import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMouseSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C10.488 4 6 8.488 6 14v4c0 5.512 4.488 10 10 10s10-4.488 10-10v-4c0-5.512-4.488-10-10-10zm-1 2.063V13H8.062A7.994 7.994 0 0115 6.062zm2 0A7.994 7.994 0 0123.938 13H17zM8 15h16v3c0 4.43-3.57 8-8 8s-8-3.57-8-8z'
    })
  );
}
export default SvgMouseSolid;
