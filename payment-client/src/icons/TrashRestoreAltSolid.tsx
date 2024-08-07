import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTrashRestoreAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 4c-.522 0-1.06.184-1.438.563C13.185 4.94 13 5.478 13 6v1H7v2h1v16c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V9h1V7h-6V6c0-.522-.184-1.06-.563-1.438C20.06 4.186 19.523 4 19 4h-4zm0 2h4v1h-4V6zm-5 3h14v16c0 .555-.445 1-1 1H11c-.555 0-1-.445-1-1V9zm7 3l-4 4h3v7h2v-7h3l-4-4z'
    })
  );
}
export default SvgTrashRestoreAltSolid;
