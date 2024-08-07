import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLongArrowAltUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4.094l-6.719 6.718 1.438 1.407L15 7.938V28h2V7.937l4.281 4.282 1.438-1.406z'
    })
  );
}
export default SvgLongArrowAltUpSolid;
