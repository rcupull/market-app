import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgOutdentSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M3 7v2h13V7zm0 4v2h20v-2zm22 0v10l5-5zM3 15v2h20v-2zm0 4v2h20v-2zm0 4v2h13v-2z',
    }),
  );
}
export default SvgOutdentSolid;
