import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-3.855 0-7 3.145-7 7 0 2.41 1.23 4.55 3.094 5.813C8.527 19.343 6 22.883 6 27h2a7.98 7.98 0 013.813-6.813A4.537 4.537 0 0016 23a4.537 4.537 0 004.188-2.813A7.98 7.98 0 0124 27h2c0-4.117-2.527-7.656-6.094-9.188A7.024 7.024 0 0023 12c0-3.855-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zm0 12c.82 0 1.602.117 2.344.344a2.485 2.485 0 01-4.688 0A7.985 7.985 0 0116 19z'
    })
  );
}
export default SvgUserAltSolid;
