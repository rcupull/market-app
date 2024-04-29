import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPlusSquareSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 5v22h22V5zm2 2h18v18H7zm8 4v4h-4v2h4v4h2v-4h4v-2h-4v-4z' }),
  );
}
export default SvgPlusSquareSolid;
