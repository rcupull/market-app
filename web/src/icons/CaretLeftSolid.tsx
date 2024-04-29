import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCaretLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M20 4.594L18.281 6.28l-9 9-.687.719.687.719 9 9L20 27.406zm-2 4.843v13.126L11.437 16z',
    }),
  );
}
export default SvgCaretLeftSolid;
