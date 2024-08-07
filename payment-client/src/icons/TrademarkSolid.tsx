import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTrademarkSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 8v2h4v13h2V10h4V8zm12 0v15h2V10.875l4.156 6.656.844 1.344.844-1.344L27 10.875V23h2V8h-2.563l-.28.469L22 15.125l-4.156-6.656L17.562 8z'
    })
  );
}
export default SvgTrademarkSolid;
