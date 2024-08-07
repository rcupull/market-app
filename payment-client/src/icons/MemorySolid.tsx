import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMemorySolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M2 7v18h13v-1c0-.555.445-1 1-1 .555 0 1 .445 1 1v1h13V7zm2 2h24v9H4zm2 2v5h6v-5zm7 0v5h6v-5zm7 0v5h6v-5zM8 13h2v1H8zm7 0h2v1h-2zm7 0h2v1h-2zM4 20h24v3h-9.406c-.442-1.11-1.336-2-2.594-2-1.258 0-2.152.89-2.594 2H4z'
    })
  );
}
export default SvgMemorySolid;
