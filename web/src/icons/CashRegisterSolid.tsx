import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCashRegisterSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M22 3v4c-1.848 0-3.613.332-5.266.91l-.527-1.148.902-.403-.812-1.828-3.652 1.625.812 1.828.922-.41.512 1.106a16.126 16.126 0 00-3.043 1.988l-.786-.836.727-.668-1.351-1.476-2.946 2.707 1.352 1.476.742-.684.805.848a15.929 15.929 0 00-2.446 3.395l-1.082-.535.45-.883-1.782-.907-1.812 3.567 1.781.906.457-.902 1.145.57A15.912 15.912 0 006.05 22H4v6h24V3zm2 2h2v17H8.05C8.563 14.727 14.595 9 22 9h2zm-6 6.953a2.001 2.001 0 00-1 3.735V20h5v-2h-3v-2.316a1.998 1.998 0 00-1-3.73zM6 24h20v2H6z'
    })
  );
}
export default SvgCashRegisterSolid;
