import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgYenSignSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7.188 5l6.875 11H10v2h5v2h-5v2h5v5h2v-5h5v-2h-5v-2h5v-2h-4.063l6.875-11h-2.375L16 15.344 9.562 5z'
    })
  );
}
export default SvgYenSignSolid;
