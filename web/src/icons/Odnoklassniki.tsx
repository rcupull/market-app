import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgOdnoklassniki(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M15 8.328a2.354 2.354 0 012.352 2.352A2.353 2.353 0 0115 13.027a2.353 2.353 0 01-2.352-2.347A2.354 2.354 0 0115 8.328zm0 8.027a5.684 5.684 0 005.68-5.675A5.685 5.685 0 0015 5a5.681 5.681 0 00-5.676 5.68A5.68 5.68 0 0015 16.355zm2.297 4.633a10.706 10.706 0 003.297-1.367 1.664 1.664 0 10-1.774-2.816 7.215 7.215 0 01-7.644 0 1.664 1.664 0 00-1.77 2.816 10.706 10.706 0 003.297 1.367L9.527 24.16a1.664 1.664 0 002.356 2.352L15 23.395l3.121 3.117c.649.652 1.7.652 2.352 0a1.664 1.664 0 000-2.352l-3.176-3.172z',
    })
  );
}
export default SvgOdnoklassniki;
