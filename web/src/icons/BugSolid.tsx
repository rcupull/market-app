import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBugSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M10.719 3.281L9.28 4.72l1.938 1.937c-1.461 1.117-2.61 2.754-3.344 4.657l-2.438-1.22-.875 1.813 2.75 1.375C7.13 14.156 7 15.062 7 16c0 .34.008.668.031 1H4v2h3.375c.242 1.043.563 2.04 1.031 2.938l-3 2.25 1.188 1.625 2.937-2.188C11.148 25.68 13.418 27 16 27c2.582 0 4.852-1.32 6.469-3.375l2.937 2.188 1.188-1.625-3-2.25c.468-.899.789-1.895 1.031-2.938H28v-2h-3.031A14.1 14.1 0 0025 16c0-.938-.129-1.844-.313-2.719l2.75-1.375-.875-1.812-2.437 1.219c-.734-1.903-1.883-3.54-3.344-4.657L22.72 4.72 21.28 3.28 18.97 5.594A7.572 7.572 0 0016 5a7.572 7.572 0 00-2.969.594zM16 7c1.977 0 3.828 1.094 5.125 2.875C19.992 10.387 18.199 11 16 11c-2.2 0-3.992-.613-5.125-1.125C12.172 8.094 14.023 7 16 7zm-6.094 4.594A14.652 14.652 0 0015 12.938v11.968C11.7 24.281 9 20.63 9 16c0-1.617.336-3.113.906-4.406zm12.188 0c.57 1.293.906 2.789.906 4.406 0 4.629-2.7 8.281-6 8.906V12.938c2.172-.165 3.941-.801 5.094-1.344z',
    }),
  );
}
export default SvgBugSolid;