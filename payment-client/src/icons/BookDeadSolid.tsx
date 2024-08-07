import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBookDeadSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 4C7.355 4 6 5.355 6 7v18c0 1.645 1.355 3 3 3h17V4H9zm0 2h15v16H9a2.93 2.93 0 00-1 .188V7c0-.566.434-1 1-1zm7 3c-5.926 0-4.938 8-4.938 8H13v2h6v-2h1.938S21.925 9 16 9zm-2 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 2l1 2h-2l1-2zm-7 9h15v2H9c-.566 0-1-.434-1-1 0-.566.434-1 1-1z'
    })
  );
}
export default SvgBookDeadSolid;
