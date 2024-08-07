import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPraySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17.5 4C15.57 4 14 5.57 14 7.5s1.57 3.5 3.5 3.5S21 9.43 21 7.5 19.43 4 17.5 4zm0 2c.827 0 1.5.673 1.5 1.5S18.327 9 17.5 9 16 8.327 16 7.5 16.673 6 17.5 6zm-4.344 6a2.747 2.747 0 00-2.529 1.67L8.66 18.256c-.519 1.212-.196 2.603.865 3.508L13.943 25H7v2h8.484a1.493 1.493 0 00.885-2.701l-5.601-4.102a.994.994 0 01-.27-1.152l1.967-4.588c.203-.474.904-.59 1.25-.213l2.433 3.988.073.104c.315.393.785.635 1.287.662.51.026.994-.162 1.35-.518l3.921-4.851-1.556-1.258-3.592 4.451-2.25-3.685-.072-.104A2.744 2.744 0 0013.156 12z'
    })
  );
}
export default SvgPraySolid;
