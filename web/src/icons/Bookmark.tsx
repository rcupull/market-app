import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBookmark(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 5v23l1.594-1.188L16 21.25l7.406 5.563L25 28V5zm2 2h14v17l-6.406-4.813L16 18.75l-.594.438L9 24z'
    })
  );
}
export default SvgBookmark;
