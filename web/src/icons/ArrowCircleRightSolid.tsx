import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowCircleRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm.719 4.594L15.28 11l4 4H9v2h10.281l-4 4 1.438 1.406L23.125 16z'
    })
  );
}
export default SvgArrowCircleRightSolid;
