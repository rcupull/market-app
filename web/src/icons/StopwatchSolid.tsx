import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStopwatchSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M13 4v2h6V4zm3 3C9.937 7 5 11.938 5 18c0 6.063 4.938 11 11 11 6.063 0 11-4.938 11-11 0-2.918-1.137-5.59-3-7.563l1.719-1.718L24.28 7.28 22.47 9.094A10.966 10.966 0 0016 7zm0 2c4.98 0 9 4.02 9 9s-4.02 9-9 9-9-4.02-9-9 4.02-9 9-9zm-1 2v5.281c-.598.348-1 .98-1 1.719 0 .738.402 1.371 1 1.719V21h2v-1.281c.598-.348 1-.98 1-1.719 0-.738-.402-1.371-1-1.719V11z'
    })
  );
}
export default SvgStopwatchSolid;
