import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPillsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M8.5 5A5.506 5.506 0 003 10.5v11C3 24.532 5.467 27 8.5 27s5.5-2.468 5.5-5.5v-11C14 7.468 11.533 5 8.5 5zm0 2c1.93 0 3.5 1.57 3.5 3.5V15H5v-4.5C5 8.57 6.57 7 8.5 7zm14 7a6.508 6.508 0 00-6.5 6.5c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 2c2.481 0 4.5 2.019 4.5 4.5 0 .879-.262 1.693-.7 2.387l-6.187-6.188A4.459 4.459 0 0122.5 16zM5 17h7v4.5c0 1.93-1.57 3.5-3.5 3.5S5 23.43 5 21.5V17zm13.7 1.113l6.187 6.188c-.694.437-1.508.699-2.387.699a4.505 4.505 0 01-4.5-4.5c0-.879.262-1.693.7-2.387z'
    })
  );
}
export default SvgPillsSolid;
