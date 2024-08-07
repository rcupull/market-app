import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleDoubleRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9.094 4.781L7.688 6.22 17.468 16l-9.78 9.781 1.406 1.438L20.313 16zm7 0L14.687 6.22 24.47 16l-9.782 9.781 1.407 1.438L27.312 16z'
    })
  );
}
export default SvgAngleDoubleRightSolid;
