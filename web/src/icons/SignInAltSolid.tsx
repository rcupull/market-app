import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSignInAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C10.422 4 5.742 7.832 4.406 13H6.47C7.746 8.945 11.53 6 16 6c5.516 0 10 4.484 10 10s-4.484 10-10 10c-4.469 0-8.254-2.945-9.531-7H4.406c1.336 5.168 6.016 9 11.594 9 6.617 0 12-5.383 12-12S22.617 4 16 4zm-.656 7.281l-1.438 1.438L16.187 15H4v2h12.188l-2.282 2.281 1.438 1.438 4-4L20.03 16l-.687-.719z'
    })
  );
}
export default SvgSignInAltSolid;
