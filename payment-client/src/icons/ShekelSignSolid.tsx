import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgShekelSignSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 5v22h2V7h1c3.879 0 7 3.121 7 7v7h2v-7c0-4.957-4.043-9-9-9zm15 0v20h-1c-3.879 0-7-3.121-7-7v-7h-2v7c0 4.957 4.043 9 9 9h3V5z'
    })
  );
}
export default SvgShekelSignSolid;
