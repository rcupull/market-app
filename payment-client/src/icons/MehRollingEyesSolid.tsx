import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMehRollingEyesSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-5 5c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm10 0c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm-10.98 2.268A1.5 1.5 0 0011.5 14a1.5 1.5 0 001.326-.805c.11.247.174.518.174.805 0 1.103-.897 2-2 2s-2-.897-2-2c0-.745.414-1.388 1.02-1.732zm11.96 0c.606.344 1.02.987 1.02 1.732 0 1.103-.897 2-2 2s-2-.897-2-2c0-.287.065-.558.174-.805A1.5 1.5 0 0020.5 14a1.5 1.5 0 001.48-1.732zM12 20v2h8v-2h-8z'
    })
  );
}
export default SvgMehRollingEyesSolid;
