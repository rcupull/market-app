import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSquareSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M6 6v20h20V6H6z' }),
  );
}
export default SvgSquareSolid;
