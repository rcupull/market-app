import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChartPieSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm-1.125 2.063c.043-.004.082.003.125 0v11.343l.281.313 7.781 7.75C21.157 26.062 18.688 27 16 27 9.914 27 5 22.086 5 16a10.98 10.98 0 019.875-10.938zm2.125 0A10.956 10.956 0 0126.938 15H17zM18.438 17h8.5c-.208 2.293-1.075 4.395-2.47 6.063z'
    })
  );
}
export default SvgChartPieSolid;
