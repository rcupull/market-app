import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPollHSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm3 3v2h8v-2h-8zm0 5v2h12v-2H10zm0 5v2h6v-2h-6z'
    })
  );
}
export default SvgPollHSolid;
