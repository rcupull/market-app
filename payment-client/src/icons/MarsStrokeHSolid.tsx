import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMarsStrokeHSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10 8c-4.406 0-8 3.594-8 8 0 4.406 3.594 8 8 8 4.066 0 7.438-3.066 7.938-7H20v3h2v-3h4.563l-4.282 4.281 1.438 1.438 6-6 .687-.719-.687-.719-6-6-1.438 1.438L26.563 15H22v-3h-2v3h-2.063c-.5-3.934-3.87-7-7.937-7zm0 2c3.324 0 6 2.676 6 6s-2.676 6-6 6-6-2.676-6-6 2.676-6 6-6z'
    })
  );
}
export default SvgMarsStrokeHSolid;
