import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgArrowRightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M18.719 6.781L17.28 8.22 24.063 15H4v2h20.063l-6.782 6.781 1.438 1.438 8.5-8.5.687-.719-.687-.719z'
    })
  );
}
export default SvgArrowRightSolid;
