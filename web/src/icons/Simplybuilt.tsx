import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSimplybuilt(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 7c-1.094 0-2 .906-2 2v14c0 1.094.906 2 2 2h20c1.094 0 2-.906 2-2V9c0-1.094-.906-2-2-2h-4c-1.094 0-2 .906-2 2v1h-8V9c0-1.094-.906-2-2-2zm0 2h4v3h12V9h4v14H6zm6 5.5a3 3 0 10.002 6.002A3 3 0 0012 14.5zm8 0a3 3 0 10.002 6.002A3 3 0 0020 14.5z'
    })
  );
}
export default SvgSimplybuilt;
