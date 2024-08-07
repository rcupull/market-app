import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLongArrowAltLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10.813 9.281L4.093 16l6.72 6.719 1.406-1.438L7.938 17H28v-2H7.937l4.282-4.281z'
    })
  );
}
export default SvgLongArrowAltLeftSolid;
