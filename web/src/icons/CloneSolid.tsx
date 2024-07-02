import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCloneSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9 4C6.8 4 5 5.8 5 8c0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 004 15v5.625l2 1V28h6v-6.375l2-1V19h-2v.375l-2 1V26H8v-5.625l-2-1V15c0-1.668 1.332-3 3-3s3 1.332 3 3h2a5.036 5.036 0 00-2.219-4.156C12.523 10.117 13 9.114 13 8c0-2.2-1.8-4-4-4zm14 0c-2.2 0-4 1.8-4 4 0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 0018 15v5.625l2 1V28h6v-6.375l2-1V15a5.036 5.036 0 00-2.219-4.156C26.523 10.117 27 9.114 27 8c0-2.2-1.8-4-4-4zM9 6c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm14 0c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm0 6c1.668 0 3 1.332 3 3v4.375l-2 1V26h-2v-5.625l-2-1V15c0-1.668 1.332-3 3-3zm-8 2.188V16h-4v2h4v1.813L17.813 17z',
    })
  );
}
export default SvgCloneSolid;
