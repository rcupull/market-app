import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSellsy(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M18 4c-3.664 0-6.727 2.25-8.125 5.406C9.293 9.164 8.672 9 8 9c-2.75 0-5 2.25-5 5 0 .145.02.27.031.406C1.258 15.676 0 17.66 0 20c0 3.855 3.145 7 7 7h18c3.855 0 7-3.145 7-7 0-3.152-2.152-5.727-5.031-6.594.008-.136.031-.265.031-.406 0-4.957-4.043-9-9-9zm0 2c3.879 0 7 3.121 7 7 0 .305-.02.613-.063.938l-.156.968 1 .156A4.977 4.977 0 0130 20c0 2.773-2.227 5-5 5H7c-2.773 0-5-2.227-5-5a5 5 0 012.563-4.375l.625-.344-.125-.719A2.82 2.82 0 015 14c0-1.668 1.332-3 3-3 .652 0 1.25.203 1.75.563l1.125.843.406-1.375A6.993 6.993 0 0118 6zm2 7v9h2v-9zm-4 2v7h2v-7zm-4 1v6h2v-6zm-4 1v5h2v-5z'
    })
  );
}
export default SvgSellsy;
