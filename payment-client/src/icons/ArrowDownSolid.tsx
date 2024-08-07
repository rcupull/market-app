import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowDownSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 4v20.063L8.219 17.28 6.78 18.72l8.5 8.5.719.687.719-.687 8.5-8.5-1.438-1.438L17 24.063V4z'
    })
  );
}
export default SvgArrowDownSolid;
