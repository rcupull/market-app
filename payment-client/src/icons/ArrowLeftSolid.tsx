import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M13.281 6.781l-8.5 8.5-.687.719.687.719 8.5 8.5 1.438-1.438L7.938 17H28v-2H7.937l6.782-6.781z'
    })
  );
}
export default SvgArrowLeftSolid;
