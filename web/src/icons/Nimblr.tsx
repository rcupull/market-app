import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgNimblr(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 1v18h.025c-.008.166-.025.331-.025.5 0 5.238 4.262 9.5 9.5 9.5s9.5-4.262 9.5-9.5-4.262-9.5-9.5-9.5c-2.806 0-5.326 1.23-7.066 3.172L7 1zm9.5 11c4.136 0 7.5 3.364 7.5 7.5S20.636 27 16.5 27 9 23.636 9 19.5s3.364-7.5 7.5-7.5zm-3 5a1.5 1.5 0 000 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 000 3 1.5 1.5 0 000-3z'
    })
  );
}
export default SvgNimblr;
