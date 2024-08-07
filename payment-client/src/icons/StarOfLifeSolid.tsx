import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStarOfLifeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M13 4v6.805L7.107 7.402l-3 5.198L10 16l-5.893 3.4 3 5.198L13 21.195V28h6v-6.805l5.893 3.403 3-5.198L22 16l5.893-3.4-3-5.198L19 10.805V4h-6zm2 2h2v8.27l7.16-4.135 1 1.73L18 16l7.16 4.135-1 1.73L17 17.73V26h-2v-8.27l-7.16 4.135-1-1.73L14 16l-7.16-4.135 1-1.73L15 14.27V6z'
    })
  );
}
export default SvgStarOfLifeSolid;
