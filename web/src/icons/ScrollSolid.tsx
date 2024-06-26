import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgScrollSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M10 4C8.355 4 7 5.355 7 7v14H4v4c0 1.645 1.355 3 3 3h14.031A3.017 3.017 0 0024 25V11h4V7c0-1.645-1.355-3-3-3H10zm0 2h12.188A2.953 2.953 0 0022 7v18c0 .566-.434 1-1 1-.563.008-.992-.438-1-1l-.031-4H9V7c0-.566.434-1 1-1zm15 0c.566 0 1 .434 1 1v2h-2V7c0-.566.434-1 1-1zM6 23h12v2.031c.004.344.075.66.188.969H7c-.566 0-1-.434-1-1v-2z',
    })
  );
}
export default SvgScrollSolid;
