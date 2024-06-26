import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAdSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M2 7v18h28V7H2zm2 2h24v14H4V9zm7.719 2l-.219.688-2.469 7.718-.031.157V21h2v-1h3v1h2v-1.438l-.031-.156-2.469-7.718-.219-.688H11.72zM21 11v4h-1.5a2.518 2.518 0 00-2.5 2.5v1c0 1.367 1.133 2.5 2.5 2.5H23V11h-2zm-8.5 4.156L13.406 18h-1.812l.906-2.844zm7 1.844H21v2h-1.5a.49.49 0 01-.5-.5v-1c0-.285.215-.5.5-.5z',
    })
  );
}
export default SvgAdSolid;
