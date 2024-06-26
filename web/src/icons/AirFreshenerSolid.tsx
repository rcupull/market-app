import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAirFreshenerSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 2c-1.654 0-3 1.346-3 3 0 .854.363 1.621.938 2.168L9.056 14h2.076l-4 6H15v2H9v6h14v-6h-6v-2h7.867l-4-6h2.076l-4.879-6.832A2.986 2.986 0 0019 5c0-1.654-1.346-3-3-3zm0 2c.552 0 1 .449 1 1a.999.999 0 01-.59.906l-.076.028A.979.979 0 0116 6a.979.979 0 01-.334-.066l-.076-.028A.999.999 0 0115 5c0-.551.448-1 1-1zm-.193 3.992c.038.003.076 0 .115 0 .026 0 .051.008.078.008.027 0 .052-.007.078-.008.04 0 .078.003.117 0L19.057 12h-1.924l4 6H10.867l4-6h-1.924l2.864-4.008zM11 24h10v2H11v-2z',
    })
  );
}
export default SvgAirFreshenerSolid;
