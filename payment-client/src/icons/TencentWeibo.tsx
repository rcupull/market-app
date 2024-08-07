import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTencentWeibo(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M17 2c-4.96 0-9 4.04-9 9 0 1.531.383 2.957 1.063 4.219.394-.715.843-1.387 1.312-2.031A6.875 6.875 0 0110 11c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7a6.868 6.868 0 01-2.313-.406c-.343.562-.66 1.148-.937 1.781A8.91 8.91 0 0017 20c4.96 0 9-4.04 9-9s-4.04-9-9-9zm0 6a3 3 0 00-3 3c0 .336.086.637.188.938C8.457 17.242 8 25.21 8 29h2c0-3.613.418-10.742 5.406-15.469.461.293 1.008.469 1.594.469a3 3 0 000-6z'
    })
  );
}
export default SvgTencentWeibo;
