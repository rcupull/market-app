import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgShoppingBasketSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.094L7.094 12H2v6h1.25l2.781 9.281.219.719h19.5l.219-.719L28.75 18H30v-6h-5.094zm0 2.844L22.063 12H9.938zM4 14h24v2h-.75l-.219.719L24.25 26H7.75l-2.781-9.281L4.75 16H4zm7 3v7h2v-7zm4 0v7h2v-7zm4 0v7h2v-7z'
    })
  );
}
export default SvgShoppingBasketSolid;
