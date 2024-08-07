import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBellSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3c-1.105 0-2 .895-2 2 0 .086.02.168.031.25C10.574 6.133 8 9.273 8 13v9c0 .566-.434 1-1 1H6v2h7.188A2.95 2.95 0 0013 26c0 1.645 1.355 3 3 3s3-1.355 3-3a2.95 2.95 0 00-.188-1H26v-2h-1c-.566 0-1-.434-1-1v-8.719c0-3.758-2.512-7.11-6.031-8.031.011-.082.031-.164.031-.25 0-1.105-.895-2-2-2zm-.438 4c.145-.012.29 0 .438 0h.188C19.453 7.098 22 9.96 22 13.281V22c0 .352.074.684.188 1H9.813A2.95 2.95 0 0010 22v-9a6.005 6.005 0 015.563-6zM16 25c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1z'
    })
  );
}
export default SvgBellSolid;
