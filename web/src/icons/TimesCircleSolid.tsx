import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTimesCircleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-3.781 5.781L10.78 12.22 14.562 16l-3.78 3.781 1.437 1.438L16 17.437l3.781 3.782 1.438-1.438L17.437 16l3.782-3.781-1.438-1.438L16 14.562z',
    }),
  );
}
export default SvgTimesCircleSolid;
