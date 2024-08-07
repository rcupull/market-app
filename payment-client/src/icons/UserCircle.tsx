import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserCircle(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm0 3c-2.75 0-5 2.25-5 5 0 1.516.707 2.863 1.781 3.781A7.005 7.005 0 009 23h2c0-2.773 2.227-5 5-5s5 2.227 5 5h2c0-2.7-1.531-5.05-3.781-6.219C20.293 15.863 21 14.516 21 13c0-2.75-2.25-5-5-5zm0 2c1.668 0 3 1.332 3 3s-1.332 3-3 3-3-1.332-3-3 1.332-3 3-3z'
    })
  );
}
export default SvgUserCircle;
