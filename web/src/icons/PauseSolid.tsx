import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPauseSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', { d: 'M10 6v20h2V6zm10 0v20h2V6z' }),
  );
}
export default SvgPauseSolid;
