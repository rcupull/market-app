import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCalendarMinus(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 5v1H5v22h22V6h-4V5h-2v1H11V5zM7 8h2v1h2V8h10v1h2V8h2v2H7zm0 4h18v14H7zm4 6v2h10v-2z'
    })
  );
}
export default SvgCalendarMinus;
