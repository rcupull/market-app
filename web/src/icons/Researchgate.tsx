import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgResearchgate(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm12.164 3.002c-1.283 0-1.723.917-1.723 1.533v1.635c0 .83.453 1.623 1.622 1.623 1.962-.002 1.724-1.487 1.724-2.518h-1.533v.541h.904c0 .805-.377 1.346-1.094 1.346-.566 0-.892-.49-.892-1.17v-1.357c0-.63.59-.992.992-.992.717 0 .992.628.992.628l.541-.365s-.263-.904-1.533-.904zm-5.58 3.09c-.905 0-2.287.087-3.582.037v.402c.78.151 1.105.075 1.105 1.207v5.532c0 1.144-.326 1.056-1.105 1.207v.416c.377-.013 1.03-.051 1.695-.051.63 0 1.447.026 1.8.05v-.415c-1.007-.138-1.31-.025-1.31-1.207v-2.338c.34.025.63.023 1.083.023.855 1.534 1.671 2.68 2.136 3.22.842 1.019 2.189.869 2.516.718v-.377c-.503-.001-1.007-.34-1.371-.743a16.281 16.281 0 01-2.125-2.966c1.132-.277 1.974-1.346 1.974-2.403 0-1.584-1.22-2.312-2.816-2.312zm-.264.638c1.182 0 1.885.617 1.885 1.749 0 1.108-.755 1.847-2.012 1.847-.465 0-.678-.012-1.005-.037v-3.521c.326-.038.754-.038 1.132-.038z',
    })
  );
}
export default SvgResearchgate;
