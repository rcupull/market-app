import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChessRookSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 4v9h3.75l-.219 1h-.625c-.55.027-.98.496-.953 1.047.027.55.496.98 1.047.953h.094l-1 4.563L10.375 22H8.906c-.55.027-.98.496-.953 1.047.027.55.496.98 1.047.953l-1.813 2.406-.187.25V29h18v-2.344l-.188-.25L23 24c.36.004.695-.184.879-.496a1.01 1.01 0 000-1.008c-.184-.312-.52-.5-.879-.496h-1.375l-.719-1.438-1-4.562H20c.36.004.695-.184.879-.496a1.01 1.01 0 000-1.008c-.184-.312-.52-.5-.879-.496h-.531l-.219-1H23V4zm2 2h2v3h2V6h2v3h2V6h2v5H11zm3.781 7h2.438l.218 1h-2.875zm-.656 3h3.75l1.156 5.219.032.125.03.093.282.563h-6.75l.281-.563.031-.093.032-.125zM11.5 24h9l2.25 3H9.25z'
    })
  );
}
export default SvgChessRookSolid;
