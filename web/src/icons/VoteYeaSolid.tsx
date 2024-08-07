import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVoteYeaSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8 5v16h16V5H8zm2 2h12v12H10V7zm9.3 2.9L15 14.2l-2.3-2.3-1.4 1.5 3 3 .7.7.7-.7 5-5-1.4-1.5zM2 19v8h2v-6h2v-2H2zm24 0v2h2v6h2v-8h-4zM6 23v2h20v-2H6z'
    })
  );
}
export default SvgVoteYeaSolid;
