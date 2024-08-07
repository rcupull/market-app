import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgOpencart(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M1 5.25c2.934 5.566 8.117 6.434 14.406 6.563 3.711.078 11.875-.239 11.875 1.75 0 1.492-5.437 6.167-5.437 7.124 0 0 3.77-3.187 5.875-5.062C29.824 13.75 31 12.641 31 11.531c0-2.258-8.73-1.844-15.781-1.844S4.313 8.352 1 5.25zm7.875 17.281c-1.168 0-2.125.926-2.125 2.094 0 1.168.957 2.125 2.125 2.125 1.168 0 2.094-.957 2.094-2.125a2.079 2.079 0 00-2.094-2.094zm9.75 0a2.079 2.079 0 00-2.094 2.094c0 1.168.926 2.125 2.094 2.125a2.132 2.132 0 002.125-2.125c0-1.168-.957-2.094-2.125-2.094z'
    })
  );
}
export default SvgOpencart;
