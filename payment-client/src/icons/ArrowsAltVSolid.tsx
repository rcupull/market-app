import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowsAltVSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 2.094l-.719.687-8 8L8.72 12.22 15 5.938v20.125L8.719 19.78 7.28 21.22l8 8 .719.687.719-.687 8-8-1.438-1.438L17 26.063V5.938l6.281 6.28 1.438-1.437-8-8z'
    })
  );
}
export default SvgArrowsAltVSolid;
