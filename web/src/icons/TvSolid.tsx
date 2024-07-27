import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTvSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M2 7v16h28V7zm2 2h24v12H4zm6 15v2h12v-2z' }),
  );
}
export default SvgTvSolid;
