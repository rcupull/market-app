import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSignOutAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12c4.05 0 7.64-2.012 9.813-5.094l-1.625-1.156A9.985 9.985 0 0116 26c-5.535 0-10-4.465-10-10S10.465 6 16 6a9.99 9.99 0 018.188 4.25l1.625-1.156A11.987 11.987 0 0016 4zm7.344 7.281l-1.438 1.438L24.188 15H12v2h12.188l-2.282 2.281 1.438 1.438 4-4L28.03 16l-.687-.719z'
    })
  );
}
export default SvgSignOutAltSolid;
