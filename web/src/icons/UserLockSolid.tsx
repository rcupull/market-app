import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserLockSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-3.9 0-7 3.1-7 7a6.96 6.96 0 003.07 5.813C8.51 19.346 6 22.892 6 27h2c0-4.4 3.6-8 8-8 1.2 0 2.4.3 3.4.8.3-.6.6-1.2 1.1-1.7-.199-.1-.404-.179-.607-.266A6.96 6.96 0 0023 12c0-3.9-3.1-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm9 11c-2.2 0-4 1.8-4 4v2h-3v8h14v-8h-3v-2c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2v2h-4v-2c0-1.1.9-2 2-2zm-5 6h10v4H20v-4z'
    })
  );
}
export default SvgUserLockSolid;
