import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBongSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 4v2h8V4h-8zm1 3v7.678C10.091 15.875 8 18.66 8 22c0 2.236.925 4.276 2.414 5.719l.291.281h10.59l.29-.281A7.958 7.958 0 0024 22c0-1.453-.469-2.765-1.146-3.94l1.914-1.914.707.708 1.414-1.415-2.828-2.828-1.415 1.414.708.707-1.721 1.721A7.89 7.89 0 0019 14.678V7h-2v9.035l.715.213A5.995 5.995 0 0121.65 20h-11.3a5.995 5.995 0 013.935-3.752l.715-.213V7h-2zm-3 15h12c0 1.56-.642 2.943-1.613 4h-8.774C10.642 24.943 10 23.56 10 22z'
    })
  );
}
export default SvgBongSolid;
