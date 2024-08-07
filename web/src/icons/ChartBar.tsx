import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChartBar(props: StyleProps) {
  return createElement(
    'svg',
    {
      width: '1em',
      height: '1em',
      viewBox: '0 0 32 32',
      ...props
    },
    createElement('path', { d: 'M13 3v24h-2V7H5v20H3v2h26v-2h-2V14h-6v13h-2V3zm2 2h2v22h-2z' })
  );
}
export default SvgChartBar;
