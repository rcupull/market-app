import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBrailleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M12 6a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm8 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-8 8a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm8 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm-8 8a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm8 0a1.999 1.999 0 100 4 1.999 1.999 0 100-4z',
    }),
  );
}
export default SvgBrailleSolid;
