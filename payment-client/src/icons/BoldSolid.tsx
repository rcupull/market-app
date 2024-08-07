import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBoldSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 7c2.8 0 5 2.2 5 5 0 1.3-.5 2.398-1.3 3.3 1.902.7 3.3 2.5 3.3 4.7 0 2.8-2.2 5-5 5H7V7h9m-7 8h7c1.7 0 3-1.3 3-3s-1.3-3-3-3H9v6m0 8h9c1.7 0 3-1.3 3-3s-1.3-3-3-3H9v6m7-18H5v22h13c3.898 0 7-3.102 7-7 0-2.102-1-4.102-2.5-5.398.3-.801.5-1.704.5-2.602 0-3.898-3.102-7-7-7zm-5 6h5c.602 0 1 .398 1 1s-.398 1-1 1h-5zm0 8h7c.602 0 1 .398 1 1s-.398 1-1 1h-7z'
    })
  );
}
export default SvgBoldSolid;
