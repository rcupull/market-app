import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M19.031 4.281l-11 11-.687.719.687.719 11 11 1.438-1.438L10.187 16 20.47 5.719z'
    })
  );
}
export default SvgAngleLeftSolid;
