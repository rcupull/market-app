import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgShieldAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4c-2.25 0-3.766.887-5.125 1.625C9.515 6.363 8.281 7 6 7H5v1c0 7.719 2.61 12.742 5.25 15.781 2.64 3.04 5.375 4.157 5.375 4.157l.375.125.375-.125s2.734-1.094 5.375-4.125C24.39 20.78 27 15.745 27 8V7h-1c-2.27 0-3.516-.637-4.875-1.375C19.765 4.887 18.25 4 16 4zm0 2c1.75 0 2.754.613 4.156 1.375a12.52 12.52 0 004.782 1.469c-.192 6.765-2.43 11.066-4.688 13.656-2.047 2.348-3.766 3.129-4.25 3.344-.488-.219-2.203-1.02-4.25-3.375-2.258-2.598-4.496-6.89-4.688-13.625a12.475 12.475 0 004.782-1.469C13.246 6.613 14.25 6 16 6z'
    })
  );
}
export default SvgShieldAltSolid;
