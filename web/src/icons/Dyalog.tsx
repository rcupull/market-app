import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDyalog(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 5v7h2V7h7c4.962 0 9 4.038 9 9s-4.038 9-9 9H6v2h9c6.065 0 11-4.935 11-11S21.065 5 15 5H6z'
    })
  );
}
export default SvgDyalog;
