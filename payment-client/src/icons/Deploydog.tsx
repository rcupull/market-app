import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDeploydog(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 6c-2.206 0-4 1.794-4 4v12c0 2.206 1.794 4 4 4h20c2.206 0 4-1.794 4-4V10c0-2.206-1.794-4-4-4H6zm0 2h20c1.103 0 2 .897 2 2v12c0 1.103-.897 2-2 2H6c-1.103 0-2-.897-2-2V10c0-1.103.897-2 2-2zm6 2v4.555A3.955 3.955 0 0010 14a4 4 0 000 8c.732 0 1.41-.21 2-.555V22h3V10h-3zm10 0v4.555A3.955 3.955 0 0020 14a4 4 0 000 8c.732 0 1.41-.21 2-.555V22h3V10h-3zm-11.5 6.5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0110.5 16.5zm10 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0120.5 16.5z'
    })
  );
}
export default SvgDeploydog;
