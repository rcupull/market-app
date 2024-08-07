import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVimeoSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm13.879 3c-1.908 0-3.203.828-3.879 3.045.844-.362 2.091-.457 1.945.955-.039.478-.462 1.358-1.039 2.271-1.602 2.527-1.992 1.683-2.875-3.896-.25-1.571-.908-2.302-1.98-2.2-.947.087-2.463 1.594-4.051 2.99l.646.835c.616-.435.977-.61 1.08-.61.897 0 1.357 2.33 2.442 6.303.555 1.481 1.23 2.221 2.035 2.221 1.296 0 2.881-1.217 4.754-3.65 1.812-2.33 2.854-4.167 2.914-5.506.051-1.71-.678-2.758-1.992-2.758z'
    })
  );
}
export default SvgVimeoSquare;
