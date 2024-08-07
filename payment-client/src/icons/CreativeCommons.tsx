import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCreativeCommons(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-4 6c-1.645 0-3 1.355-3 3v2c0 1.645 1.355 3 3 3s3-1.355 3-3h-2c0 .566-.434 1-1 1-.566 0-1-.434-1-1v-2c0-.566.434-1 1-1 .566 0 1 .434 1 1h2c0-1.645-1.355-3-3-3zm8 0c-1.645 0-3 1.355-3 3v2c0 1.645 1.355 3 3 3s3-1.355 3-3h-2c0 .566-.434 1-1 1-.566 0-1-.434-1-1v-2c0-.566.434-1 1-1 .566 0 1 .434 1 1h2c0-1.645-1.355-3-3-3z'
    })
  );
}
export default SvgCreativeCommons;
