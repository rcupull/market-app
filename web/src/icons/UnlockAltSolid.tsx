import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUnlockAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3c-3.035 0-5.586 1.965-6.625 4.625l1.844.75C11.977 6.434 13.836 5 16 5c2.754 0 5 2.246 5 5v1.375C19.523 10.515 17.824 10 16 10c-5.512 0-10 4.488-10 10s4.488 10 10 10 10-4.488 10-10a9.97 9.97 0 00-3-7.125V10c0-3.844-3.156-7-7-7zm0 9c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm0 6c-1.105 0-2 .895-2 2 0 .738.402 1.371 1 1.719V25h2v-3.281c.598-.348 1-.98 1-1.719 0-1.105-.895-2-2-2z'
    })
  );
}
export default SvgUnlockAltSolid;
