import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCloudSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 7c-2.648 0-4.95 1.238-6.594 3.063C9.27 10.046 9.148 10 9 10c-2.2 0-4 1.8-4 4-1.73 1.055-3 2.836-3 5 0 3.3 2.7 6 6 6h16c3.3 0 6-2.7 6-6 0-3.156-2.488-5.684-5.594-5.906C23.184 9.574 19.926 7 16 7zm0 2c3.277 0 6.012 2.254 6.781 5.281l.188.781.843-.03c.211-.012.258-.032.188-.032 2.219 0 4 1.781 4 4 0 2.219-1.781 4-4 4H8c-2.219 0-4-1.781-4-4a4.007 4.007 0 012.438-3.688l.687-.28-.094-.75C7.011 14.116 7 14.022 7 14a1.984 1.984 0 012.469-1.938l.625.157.375-.5A7.008 7.008 0 0116 9z'
    })
  );
}
export default SvgCloudSolid;
