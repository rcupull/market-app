import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLongArrowAltRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M21.188 9.281L19.78 10.72 24.063 15H4v2h20.063l-4.282 4.281 1.407 1.438L27.905 16z'
    })
  );
}
export default SvgLongArrowAltRightSolid;
