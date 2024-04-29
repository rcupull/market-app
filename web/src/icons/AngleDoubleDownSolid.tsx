import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleDoubleDownSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5.219 6.688L3.78 8.094 16 20.313l12.219-12.22-1.438-1.405L16 17.468zm0 7L3.78 15.094 16 27.313l12.219-12.22-1.438-1.405L16 24.468z',
    }),
  );
}
export default SvgAngleDoubleDownSolid;
