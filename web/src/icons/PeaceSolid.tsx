import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPeaceSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm-1 2.05v10.468l-8.2 6.498A10.93 10.93 0 015 16C5 10.273 9.402 5.558 15 5.05zm2 0c5.598.508 10 5.223 10 10.95 0 2.22-.666 4.287-1.803 6.018L17 15.518V5.05zm-2 13.02v8.88a10.963 10.963 0 01-6.95-3.37L15 18.07zm2 0l6.95 5.51A10.963 10.963 0 0117 26.95v-8.88z'
    })
  );
}
export default SvgPeaceSolid;
