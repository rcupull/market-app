import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFeatherAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M27 4c-8.803 0-13.201 4.795-15.314 7.1l-3.05 3.076A8.932 8.932 0 006 20.539V22l2.027-2.027a6.944 6.944 0 012.02-4.381l3.113-3.14c1.836-2.003 5.569-6.074 12.815-6.429-.222 4.522-1.89 7.674-3.598 9.852L19 17h2.418a29.607 29.607 0 01-1.87 1.84l-.98.97L15 21h2.367l-.957.947a6.953 6.953 0 01-4.95 2.051H9.417l9.291-9.291-1.414-1.414L4 26.586 5.414 28l2.002-2.002h4.045a8.941 8.941 0 006.367-2.64l3.07-3.046C23.203 18.203 28 13.805 28 5V4h-1z'
    })
  );
}
export default SvgFeatherAltSolid;
