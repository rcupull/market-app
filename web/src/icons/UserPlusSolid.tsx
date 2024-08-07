import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserPlusSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 2C8.145 2 5 5.145 5 9c0 2.41 1.23 4.55 3.094 5.813C4.527 16.343 2 19.883 2 24h2c0-4.43 3.57-8 8-8 1.375 0 2.656.36 3.781.969A8.007 8.007 0 0014 22c0 4.406 3.594 8 8 8 4.406 0 8-3.594 8-8 0-4.406-3.594-8-8-8a7.964 7.964 0 00-4.688 1.531 10.134 10.134 0 00-1.406-.719A7.024 7.024 0 0019 9c0-3.855-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zm10 12c3.324 0 6 2.676 6 6s-2.676 6-6 6-6-2.676-6-6 2.676-6 6-6zm-1 2v3h-3v2h3v3h2v-3h3v-2h-3v-3z'
    })
  );
}
export default SvgUserPlusSolid;
