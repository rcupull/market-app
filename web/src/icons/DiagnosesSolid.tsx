import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDiagnosesSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 8h-1.38a5 5 0 00-4.33 2.52c.71.08 1.33.46 1.73 1.01.52-.94 1.51-1.53 2.6-1.53h2.76c.44 0 .85.09 1.23.26.21-.69.71-1.24 1.35-1.53a4.9 4.9 0 00-2.58-.73H16zm0-6c1.12 0 2 .88 2 2s-.88 2-2 2-2-.88-2-2 .88-2 2-2zm5 8a1 1 0 000 2 1 1 0 000-2zm-11 2a1 1 0 000 2 1 1 0 000-2zm12.73.81c-.45.43-1.06.69-1.73.69-.05 0-.11 0-.16-.01l1.25 2.92.19.47.53.09 5 1 .38-1.94-4.47-.91-.99-2.31zM15 18a1 1 0 000 2 1 1 0 000-2zm-6.63 1.9l-.09.22-4.47.91.38 1.94 5-1 .53-.09.19-.47.4-.93a2.514 2.514 0 01-1.941-.58zM18 21a1 1 0 000 2 1 1 0 000-2zM2 25v2h28v-2H2z',
    })
  );
}
export default SvgDiagnosesSolid;
