import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBarcodeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M2 7v18h2V7zm4 0v18h6V7zm8 0v18h2V7zm4 0v18h4V7zm6 0v18h2V7zm4 0v18h2V7z'
    })
  );
}
export default SvgBarcodeSolid;
