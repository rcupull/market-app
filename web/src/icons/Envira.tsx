import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEnvira(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5c2.614 8.976 2.362 13.181 6.896 16.693 3.97 3.026 7.94 2.237 10.112 1.914L25.398 27h2l-3.98-3.98C23.393 20.613 29.01 5 5 5zm3.084 2.002c.135.011.45.121 1.047.396 3.999 1.85 5.408 4.592 6.931 7.4 1.096 2.023 3.019 5.103 4.374 6.095 1.356.983 2.836 1.709-.288.398-3.134-1.311-5.417-5.032-6.931-7.85-1.164-2.162-2.163-4.153-4.336-5.613 0 0-1.203-.86-.797-.826z'
    })
  );
}
export default SvgEnvira;
