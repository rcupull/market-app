import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDonateSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C10.486 3 6 7.486 6 13s4.486 10 10 10 10-4.486 10-10S21.514 3 16 3zm0 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm-1 2v1.19a3.076 3.076 0 00-1.674 1.464 2.918 2.918 0 00-.264 1.945 3.061 3.061 0 00.822 1.516c.273.273.598.494.956.647.358.153.75.238 1.16.238.142 0 .276.027.396.076a.961.961 0 01.528.528c.049.12.076.254.076.396a.976.976 0 01-.604.924c-.12.049-.254.076-.396.076-.143 0-.276-.027-.396-.076a.961.961 0 01-.317-.211A.996.996 0 0115 15h-2a2.944 2.944 0 00.857 2.076 3.062 3.062 0 001.143.735V19h2v-1.19a3.024 3.024 0 001.96-2.335 2.944 2.944 0 00-.478-2.145 3.061 3.061 0 00-.812-.812 3.027 3.027 0 00-1.07-.456A2.94 2.94 0 0016 12c-.143 0-.276-.027-.396-.076a.961.961 0 01-.528-.528A1.044 1.044 0 0115 11c0-.143.027-.276.076-.396a.961.961 0 01.528-.528c.12-.049.254-.076.396-.076.57 0 1 .43 1 1h2a2.944 2.944 0 00-.148-.924A3.046 3.046 0 0017 8.19V7h-2zM2 21v8h2v-6h5.38a12.093 12.093 0 01-2.3-2H2zm22.92 0a12.093 12.093 0 01-2.3 2H28v6h2v-8h-5.08zM6 25v2h20v-2H6z',
    })
  );
}
export default SvgDonateSolid;
