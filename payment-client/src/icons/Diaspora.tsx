import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDiaspora(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12.006 5v6.143l-5.637-1.88-2.215 6.641 5.662 1.889L6.1 22.801l5.62 4.172 3.67-4.946 3.471 5.073 5.776-3.954-3.598-5.255 5.777-1.868-2.152-6.662L20 11.191 19 5h-6.994zM14 7h3.006v6.94l6.371-2.06.922 2.854-6.422 2.077 3.98 5.814-2.476 1.693-3.926-5.736-4.148 5.594-2.41-1.79 4.17-5.618-6.381-2.127.947-2.846L14 14V7z'
    })
  );
}
export default SvgDiaspora;
