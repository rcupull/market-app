import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCheckDoubleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M23.281 7.281L11.5 19.063 8.719 16.28 7.28 17.72l2.782 2.781L8 22.563 1.719 16.28.28 17.72l7 7 .719.687.719-.687 2.781-2.782 2.781 2.782.719.687.719-.687 15.906-16-1.438-1.438L15 22.563 12.937 20.5 24.72 8.719z'
    })
  );
}
export default SvgCheckDoubleSolid;
