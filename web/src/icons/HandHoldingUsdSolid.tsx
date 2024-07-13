import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHandHoldingUsdSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M17 4v1.19a3.076 3.076 0 00-1.674 1.464 2.925 2.925 0 00-.264 1.946 3.061 3.061 0 001.268 1.883c.48.325 1.055.517 1.67.517.142 0 .276.027.396.076a.961.961 0 01.528.528c.049.12.076.254.076.396a.976.976 0 01-.604.924c-.12.049-.254.076-.396.076-.142 0-.276-.027-.396-.076a.961.961 0 01-.528-.528A1.044 1.044 0 0117 12h-2a2.944 2.944 0 00.857 2.076 3.062 3.062 0 001.143.735V16h2v-1.19c1.16-.42 2-1.52 2-2.81 0-1.435-1.041-2.655-2.4-2.938A2.94 2.94 0 0018 9c-.142 0-.276-.027-.396-.076a.96.96 0 01-.528-.528A1.044 1.044 0 0117 8c0-.143.027-.276.076-.396a.961.961 0 01.211-.317A.996.996 0 0118 7c.57 0 1 .43 1 1h2a2.944 2.944 0 00-.148-.924A3.046 3.046 0 0019 5.19V4h-2zm-6.484 14a6.428 6.428 0 00-1.817.266l-.02.007-5.671 2.176 1.984 5.57 4.93-1.89 7.137 3.93 12.324-5.106-.766-1.844-11.437 4.735-7.102-3.91-3.89 1.488-.641-1.805 3.797-1.457c.009-.004.476-.16 1.172-.16.703 0 1.522.156 2.222.79l.014.007.004.004c1.03.895 1.808 1.52 2.89 1.86 1.082.34 2.31.378 4.36.37l-.01-2c-2.012.008-3.063-.063-3.75-.281-.688-.211-1.176-.59-2.168-1.45l-.012-.007c-1.157-1.039-2.531-1.297-3.55-1.293z',
    })
  );
}
export default SvgHandHoldingUsdSolid;
