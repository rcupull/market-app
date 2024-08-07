import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCircleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.379 4 4 9.379 4 16s5.379 12 12 12 12-5.379 12-12S22.621 4 16 4zm0 1c6.082 0 11 4.918 11 11s-4.918 11-11 11S5 22.082 5 16 9.918 5 16 5z'
    })
  );
}
export default SvgCircleSolid;
