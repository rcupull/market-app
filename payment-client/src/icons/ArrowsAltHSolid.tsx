import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowsAltHSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9.281 6.781l-8.5 8.5L.094 16l.687.719 8.5 8.5 1.438-1.438L3.938 17h24.125l-6.782 6.781 1.438 1.438 8.5-8.5.687-.719-.687-.719-8.5-8.5L21.28 8.22 28.063 15H3.938l6.78-6.781z'
    })
  );
}
export default SvgArrowsAltHSolid;
