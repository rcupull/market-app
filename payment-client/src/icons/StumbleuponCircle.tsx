import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStumbleuponCircle(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.398 4 4 9.398 4 16s5.398 12 12 12 12-5.398 12-12S22.602 4 16 4zm0 7c-.602 0-1 .398-1 1v6c0 1.7-1.3 3-3 3s-3-1.3-3-3v-2h2v2c0 .602.398 1 1 1s1-.398 1-1v-6c0-1.7 1.3-3 3-3s3 1.3 3 3v1c0 .602-.398 1-1 1s-1-.398-1-1v-1c0-.602-.398-1-1-1zm7 7c0 1.7-1.3 3-3 3s-3-1.3-3-3v-2.3c.3.198.602.3 1 .3a1.7 1.7 0 001-.3V18c0 .602.398 1 1 1s1-.398 1-1v-2h2z'
    })
  );
}
export default SvgStumbleuponCircle;
