import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleDoubleLeftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M15.906 4.781L4.687 16l11.22 11.219 1.405-1.438L7.533 16l9.78-9.781zm7 0L11.688 16l11.218 11.219 1.407-1.438L14.53 16l9.781-9.781z',
    }),
  );
}
export default SvgAngleDoubleLeftSolid;
