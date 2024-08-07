import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBusAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 3a2.997 2.997 0 00-2.816 2H9C6.8 5 5 6.8 5 9v5H3v3h2v10c0 .55.45 1 1 1h3l.34-1h13.32l.34 1h3c.55 0 1-.45 1-1V17h2v-3h-2V9c0-2.2-1.8-4-4-4h-.184A2.997 2.997 0 0020 3h-8zm0 2h8c.552 0 1 .449 1 1v1h2c1.12 0 2 .88 2 2v2H7V9c0-1.12.88-2 2-2h2V6c0-.551.448-1 1-1zm1 2v2h6V7h-6zm-6 6h8v4H7v-4zm10 0h8v4h-8v-4zM7 19h18v6H7v-6zm1 2v2h4v-2H8zm12 0v2h4v-2h-4z'
    })
  );
}
export default SvgBusAltSolid;
