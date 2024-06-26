import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSearchDollarSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M19 3C13.489 3 9 7.489 9 13c0 2.395.839 4.587 2.25 6.313L3.281 27.28l1.438 1.44 7.968-7.969A9.923 9.923 0 0019 23c5.511 0 10-4.489 10-10S24.511 3 19 3zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm-1 3v1.063c-1.125.188-2 1.142-2 2.314 0 .754.418 1.443 1.094 1.78L20 14.624a.356.356 0 01-.375.375h-1.25a.356.356 0 01-.375-.375V14h-2v.625c0 1.172.875 2.125 2 2.313V18h2v-1.063c1.125-.188 2-1.142 2-2.314 0-.754-.418-1.44-1.094-1.78L18 11.376c0-.223.152-.375.375-.375h1.25c.223 0 .375.152.375.375V12h2v-.625c0-1.172-.875-2.124-2-2.313V8h-2z',
    })
  );
}
export default SvgSearchDollarSolid;
