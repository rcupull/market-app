import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChevronCircleLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm1.781 4.281l-6 6-.687.719.687.719 6 6 1.438-1.438L13.937 16l5.282-5.281z'
    })
  );
}
export default SvgChevronCircleLeftSolid;
