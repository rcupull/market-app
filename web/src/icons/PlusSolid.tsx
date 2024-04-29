import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPlusSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M15 5v10H5v2h10v10h2V17h10v-2H17V5z' }),
  );
}
export default SvgPlusSolid;
