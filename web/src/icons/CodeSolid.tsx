import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCodeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M18 5l-6 22h2l6-22zM7.937 6.406l-6.75 9L.75 16l.438.594 6.75 9 1.625-1.188L3.25 16l6.313-8.406zm16.125 0l-1.625 1.188L28.75 16l-6.313 8.406 1.625 1.188 6.75-9L31.25 16l-.438-.594z'
    })
  );
}
export default SvgCodeSolid;
