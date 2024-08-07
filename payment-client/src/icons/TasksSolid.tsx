import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTasksSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10.293 5.293L7 8.586 5.707 7.293 4.293 8.707 7 11.414l4.707-4.707zM14 7v2h14V7zm0 8v2h14v-2zm0 8v2h14v-2z'
    })
  );
}
export default SvgTasksSolid;
