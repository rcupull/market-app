import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgExpandSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M4 4v9h2V6h7V4H4zm15 0v2h7v7h2V4h-9zM4 19v9h9v-2H6v-7H4zm22 0v7h-7v2h9v-9h-2z',
    })
  );
}
export default SvgExpandSolid;
