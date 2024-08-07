import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGolfBallSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C10.488 3 6 7.488 6 13c0 3.684 2.023 6.89 5 8.625V22l-.031 1H11c.047 0 .988.027 1.969.625.867.527 1.777 1.41 2 3.375H7v2h18v-2h-7.969c.223-1.965 1.133-2.848 2-3.375.98-.598 1.922-.625 1.969-.625h.031L21 22v-.375c2.977-1.734 5-4.941 5-8.625 0-5.512-4.488-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm3 6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-5 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2.719 7h1.438A6.12 6.12 0 0016 24a6.12 6.12 0 00-.719-1z'
    })
  );
}
export default SvgGolfBallSolid;
