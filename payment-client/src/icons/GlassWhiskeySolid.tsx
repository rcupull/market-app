import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGlassWhiskeySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4.818 7l3.334 20h15.696L27.18 7H4.818zm2.364 2H24.82l-1.666 10H10.67l.33 2h11.82l-.666 4H9.848L7.182 9z'
    })
  );
}
export default SvgGlassWhiskeySolid;
