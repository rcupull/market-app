import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThinkPeaks(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M15.506 2.44L3 24h2.313L15.51 6.42l10.119 17.379L29.574 17h-2.312l-1.637 2.82-10.12-17.38zm.02 7.99L8.813 22h2.315l4.4-7.59L24.027 29h2.315L15.525 10.43z',
    })
  );
}
export default SvgThinkPeaks;
