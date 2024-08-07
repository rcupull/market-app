import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEthereum(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.953 3L6.93 15.553l9.074 4.46 8.93-4.464L17.053 3h-2.1zM15 6.637v4.351l-3.914 1.776L15 6.637zm2 .04l3.818 6.08L17 11.005V6.678zm-2 6.507v4.107l-4.344-2.137L15 13.184zm2 .023l4.246 1.95L17 17.278v-4.072zM7 17.512v2.52l7.928 8.843h2.144L25 20.031v-2.52l-9 4.614-9-4.613zm4.521 4.566L15 23.861v2.096l-3.479-3.879zm8.958 0L17 25.957v-2.096l3.479-1.783z'
    })
  );
}
export default SvgEthereum;
