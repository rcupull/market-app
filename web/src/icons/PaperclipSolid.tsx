import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPaperclipSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M21 4c-1.39 0-2.758.54-3.813 1.594l-9.375 9.375c-2.972 2.972-2.972 7.808 0 10.781 2.973 2.973 7.81 2.973 10.782 0l6.25-6.25-1.407-1.406-6.25 6.25a5.623 5.623 0 01-7.968 0 5.623 5.623 0 010-7.969L18.594 7a3.414 3.414 0 014.843 0 3.414 3.414 0 010 4.844l-9.375 9.375c-.48.48-1.238.48-1.718 0a1.205 1.205 0 010-1.719l8.594-8.594L19.53 9.5l-8.593 8.594a3.213 3.213 0 000 4.531 3.213 3.213 0 004.53 0l9.376-9.375A5.423 5.423 0 0021 4z',
    })
  );
}
export default SvgPaperclipSolid;
