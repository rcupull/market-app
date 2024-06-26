import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFlaskSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M17 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 3c-.55 0-1 .45-1 1h-3v2h1v7.656l-6.156 7.938A3.977 3.977 0 004 24.03 3.98 3.98 0 007.969 28H24.03A3.98 3.98 0 0028 24.031c0-.883-.3-1.738-.844-2.437L21 13.656V6h1V4h-7c0-.55-.45-1-1-1zm-1 3h6v8.344L21.844 18H10.156L13 14.344zm4 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM8.594 20h14.812l2.188 2.813c.27.347.406.78.406 1.218A1.946 1.946 0 0124.031 26H7.97A1.946 1.946 0 016 24.031c0-.437.137-.87.406-1.218z',
    })
  );
}
export default SvgFlaskSolid;
