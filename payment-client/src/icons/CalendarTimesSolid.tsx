import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCalendarTimesSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 5v1H5v22h22V6h-4V5h-2v1H11V5zM7 8h2v1h2V8h10v1h2V8h2v2H7zm0 4h18v14H7zm6.219 2.781L11.78 16.22 14.562 19l-2.78 2.781 1.437 1.438L16 20.437l2.781 2.782 1.438-1.438L17.437 19l2.782-2.781-1.438-1.438L16 17.562z'
    })
  );
}
export default SvgCalendarTimesSolid;
