import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgUploadSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.594l-.719.687-7 7L9.72 12.72 15 7.438V24h2V7.437l5.281 5.282 1.438-1.438-7-7zM7 26v2h18v-2z'
    })
  );
}
export default SvgUploadSolid;
