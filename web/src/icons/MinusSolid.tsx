import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMinusSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M5 15v2h22v-2z' }),
  );
}
export default SvgMinusSolid;
