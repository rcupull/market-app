import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBellSlashSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M3.719 2.281L2.28 3.72l26 26 1.438-1.438L26 24.563V23h-1c-.55 0-1-.45-1-1v-8.719c0-3.828-2.582-7.078-6.031-8C17.98 5.188 18 5.098 18 5a1.999 1.999 0 10-4 0c0 .086.02.168.031.25a7.94 7.94 0 00-3.594 2c-.3.29-.566.613-.812.938zM15.563 7a5.56 5.56 0 01.624 0C19.395 7.098 22 9.91 22 13.281v7.281L11.062 9.626c.223-.328.458-.656.75-.938 1.028-1 2.34-1.59 3.75-1.687zM8.03 12.25A7.97 7.97 0 008 13v9c0 .55-.45 1-1 1H6v2h7.188A2.95 2.95 0 0013 26c0 1.645 1.355 3 3 3s3-1.355 3-3a2.95 2.95 0 00-.188-1h2l-2-2h-9c.114-.313.188-.648.188-1v-7.813zM16 25c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1z'
    })
  );
}
export default SvgBellSlashSolid;
