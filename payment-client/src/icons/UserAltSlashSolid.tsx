import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUserAltSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.7 2.3L2.3 3.7l6.843 6.841c-.013.053-.032.104-.043.158L11 12.5v-.102L15.602 17H15.5l2.3 2.3c.041 0 .082.014.122.02l.379.38 1.5 1.5 4.1 4.099v.002l1.798 1.799h.002l2.6 2.6 1.398-1.4-4.142-4.142c-.87-2.818-2.952-5.13-5.657-6.258 1.9-1.3 3.1-3.4 3.1-5.8 0-3.9-3.1-7-7-7-2.583 0-4.812 1.388-6.045 3.457L3.7 2.3zM16 7c2.8 0 5 2.2 5 5 0 2.087-1.224 3.838-3.006 4.596l-6.59-6.59C12.162 8.224 13.913 7 16 7zm-6.8 6.3c.4 1.9 1.4 3.5 3 4.5A9.92 9.92 0 006 27h2c0-2.9 1.5-5.4 3.8-6.8.7 1.6 2.3 2.8 4.2 2.8.8 0 1.6-.2 2.2-.6l-1.5-1.5c-.2.1-.5.1-.7.1-1.1 0-2-.7-2.3-1.7l1.2-.3-5.7-5.7z'
    })
  );
}
export default SvgUserAltSlashSolid;
