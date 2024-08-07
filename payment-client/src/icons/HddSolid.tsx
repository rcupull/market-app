import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHddSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6.219 6L3 18.875V26h26v-7.125L25.781 6zM7.78 8H24.22l2.5 10H5.28zM5 20h22v4H5zm19 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'
    })
  );
}
export default SvgHddSolid;
