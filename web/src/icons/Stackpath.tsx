import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStackpath(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm3.78 6c-.99 0-2.24.46-2.24 1.64 0 .83.39 1.34 2.17 1.9.74.26.93.44.93.83 0 .65-.81.61-.83.61-.87 0-1.1-.39-1.1-.94H8.4l-.01.03C8.36 18.41 9.6 19 10.81 19c1.28 0 2.19-.58 2.19-1.64 0-.91-.52-1.48-2-1.92-.88-.31-1.11-.46-1.11-.79s.3-.63.87-.63c.6 0 .89.36.89.79h1.31l.01-.03c.02-.84-.64-1.78-2.19-1.78zm3.22.045v5.91h1.38v-2.03h.84c1.29 0 2.28-.68 2.28-1.94 0-1.08-.79-1.94-2.28-1.94H14zm6.21 0l-2.05 5.91h1.28l2.1-5.91h-1.33zm2.46 0l-2.05 5.91h1.28l2.1-5.91h-1.33zm-7.29 1.05h.84c.73 0 .91.53.91.9 0 .36-.18.88-.91.88h-.84v-1.78z'
    })
  );
}
export default SvgStackpath;
