import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPatreon(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 4v24h7V4H4zm17.5 0C16.813 4 13 7.813 13 12.5c0 4.687 3.813 8.5 8.5 8.5 4.687 0 8.5-3.813 8.5-8.5C30 7.813 26.187 4 21.5 4zM6 6h3v20H6V6zm15.5 0c3.584 0 6.5 2.916 6.5 6.5S25.084 19 21.5 19a6.508 6.508 0 01-6.5-6.5C15 8.916 17.916 6 21.5 6z'
    })
  );
}
export default SvgPatreon;
