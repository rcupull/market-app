import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPython(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5c-4.988 0-5 2-5 2v4h6v1H7s-3-.46-3 5 3 5 3 5h3v-1.625A4.383 4.383 0 0114.375 16h3.25c1.86 0 3.375-.516 3.375-2.375V7s-.012-2-5-2zm-3 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm9 4v2.625C22 16.035 20.035 17 17.625 17h-3.25A3.38 3.38 0 0011 20.375V26s.063 2 5 2c4.938 0 5-2 5-2v-4h-6v-1h10s3 .504 3-5-3-5-3-5zm-3 13c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z'
    })
  );
}
export default SvgPython;
