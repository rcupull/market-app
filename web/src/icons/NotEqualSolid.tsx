import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgNotEqualSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6.719 5.281L5.28 6.72l20 20 1.438-1.438L21.437 20H27v-2h-7.563l-4-4H27v-2H13.437zM5 12v2h4.906l-2-2zm0 6v2h10.906l-2-2z'
    })
  );
}
export default SvgNotEqualSolid;
