import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRemoveFormatSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4.29 5.973L3.083 7.57l24.693 18.608 1.203-1.598-10.953-8.254L20.285 10H25v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-16a.5.5 0 00-.5.5v2.777L4.29 5.973zM12 10h5.285l-1.623 4.545-3.728-2.81A.488.488 0 0012 11.5V10zm2.254 8.49L13 22h-1.5a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5H16l.62-1.734-2.366-1.776z'
    })
  );
}
export default SvgRemoveFormatSolid;
