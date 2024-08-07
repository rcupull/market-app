import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChromecast(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 6c-1.103 0-2 .897-2 2v4h2V8h20v16h-8v2h8c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H6zm-2 8v2c5.17 0 9.436 3.942 9.95 8.979.033.335.05.676.05 1.021h2c0-6.617-5.383-12-12-12zm0 4v2c3.309 0 6 2.691 6 6h2c0-4.411-3.589-8-8-8zm0 4v4h4a4 4 0 00-4-4z'
    })
  );
}
export default SvgChromecast;
