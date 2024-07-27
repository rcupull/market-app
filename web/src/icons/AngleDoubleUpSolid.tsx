import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAngleDoubleUpSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 4.688L3.781 16.905l1.438 1.407L16 7.53l10.781 10.782 1.438-1.407zm0 7L3.781 23.905l1.438 1.407L16 14.53l10.781 10.781 1.438-1.406z',
    }),
  );
}
export default SvgAngleDoubleUpSolid;
