import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArtstation(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M13.73 5L26 27l1.994-4.512a3.004 3.004 0 00-.123-2.908L20.096 6.436A3.003 3.003 0 0017.536 5H13.73zm-2.218 2.178L5.63 18h11.916L11.512 7.178zM4 21l2.172 4.342A2.998 2.998 0 008.854 27h13.712l-3.345-6H4z',
    })
  );
}
export default SvgArtstation;
