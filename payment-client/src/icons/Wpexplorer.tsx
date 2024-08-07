import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgWpexplorer(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zm0 2c6.1 0 11 4.9 11 11s-4.9 11-11 11S5 22.1 5 16 9.9 5 16 5zm-4.8 5l-1.8 4.3 4.3 1.8 1.8-4.3-4.3-1.8zm4.8 2.6L14.6 16l3.3 1.4.016-.035.084.035 1.5-3.4-3.5-1.4zm4 2.1l-1.1 2.7 2.7 1.1 1.2-2.7-2.8-1.1zm-5.7 1.9l-.3.6 1.1.5-2.5 5.3h.7l2.4-4.9 2.5 4.9h.7l-2.3-4.6.8.3.3-.7-3.4-1.4z'
    })
  );
}
export default SvgWpexplorer;
