import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSignSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 4v2H4v2h2v20h2V8h20V6H8V4H6zm4 6v12h16V10H10zm2 2h12v8H12v-8z'
    })
  );
}
export default SvgSignSolid;
