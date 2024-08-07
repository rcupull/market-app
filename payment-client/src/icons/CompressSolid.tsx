import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCompressSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11 4v7H4v2h9V4h-2zm8 0v9h9v-2h-7V4h-2zM4 19v2h7v7h2v-9H4zm15 0v9h2v-7h7v-2h-9z'
    })
  );
}
export default SvgCompressSolid;
