import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLongArrowAltDownSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 4v20.063l-4.281-4.282-1.438 1.407L16 27.905l6.719-6.718-1.438-1.407L17 24.063V4z'
    })
  );
}
export default SvgLongArrowAltDownSolid;
