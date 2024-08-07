import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCommentDollarSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3 6v20h9.586L16 29.414 19.414 26H29V6H3zm2 2h22v16h-8.414L16 26.586 13.414 24H5V8zm10 2v1.188c-1.156.417-2 1.521-2 2.814 0 1.645 1.355 3 3 3 .566 0 1 .434 1 1 0 .566-.434 1-1 1-.566 0-1-.434-1-1h-2c0 1.293.844 2.394 2 2.812V22h2v-1.188c1.156-.418 2-1.521 2-2.814 0-1.645-1.355-3-3-3-.566 0-1-.434-1-1 0-.566.434-1 1-1 .566 0 1 .434 1 1h2c0-1.293-.844-2.394-2-2.812V10h-2z'
    })
  );
}
export default SvgCommentDollarSolid;
