import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHatWizardSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 28c-6.203 0-8.465-2.055-8.703-2.29l-.473-.464L15.324 4h7.617l-4.726 3.363 6.957 17.887-.469.46c-.238.235-2.5 2.29-8.703 2.29zm-6.777-3.363C10.102 25.137 12.176 26 16 26c3.828 0 5.898-.863 6.781-1.367l-6.68-17.188zM18 24a3 3 0 010-6c.262 0 .508.043.75.105A3.993 3.993 0 0012 21c0 2.21 1.79 4 4 4a3.993 3.993 0 002.75-1.105A2.971 2.971 0 0118 24zm-2-11c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z'
    })
  );
}
export default SvgHatWizardSolid;
