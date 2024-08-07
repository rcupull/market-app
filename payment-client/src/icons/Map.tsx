import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMap(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M28 4.469l-1.406.625-6.625 2.843-7.625-2.875-.375-.125-.375.157-7 3-.594.25V27.53l1.406-.625 6.625-2.843 7.625 2.875.375.125.375-.157 7-3 .594-.25zM13 7.437l6 2.25v14.876l-6-2.25zM11 7.5v14.844L6 24.5V9.656zm15 0v14.844L21 24.5V9.656z'
    })
  );
}
export default SvgMap;
