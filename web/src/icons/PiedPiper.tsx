import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPiedPiper(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M13.469 4c-.848 0-1.61.27-2.344.594H7V21l1.188-.25 3.593-.719.813-.156v-3.156c.14.023.273.086.406.125v11.375l1.188-.25 3.593-.719.813-.156v-3.157c.3.047.562.188.875.188 3.426 0 6.187-2.945 6.187-6.469 0-3.476-2.695-6.367-6.062-6.437a6.45 6.45 0 00.062-.781C19.656 6.913 16.895 4 13.47 4zm0 2c2.289 0 4.187 1.941 4.187 4.438 0 2.496-1.898 4.468-4.187 4.468a3.875 3.875 0 01-1.5-.312l-1.375-.563v4.188L9 18.562V6.595h2.375l.219-.125A3.925 3.925 0 0113.469 6zm-.844.781c-.559 0-1.078.176-1.531.438l-.5.281v5.813l.5.28c.453.262.976.438 1.531.438 1.887 0 3.313-1.703 3.313-3.625s-1.426-3.625-3.313-3.625zm-.031 2h.031c.66 0 1.313.656 1.313 1.625s-.653 1.625-1.313 1.625h-.031zm6.875 4.438c2.289 0 4.187 1.941 4.187 4.437 0 2.496-1.898 4.469-4.187 4.469a3.875 3.875 0 01-1.5-.313l-1.375-.562v4.188L15 25.78V16.72a6.092 6.092 0 001.594-.688v4.5l.5.282c.453.261.976.437 1.531.437 1.887 0 3.313-1.703 3.313-3.625S20.512 14 18.625 14c.148-.234.254-.496.375-.75 0-.004.031.004.031 0 .14-.02.293-.031.438-.031zM18.594 16h.031c.66 0 1.313.656 1.313 1.625s-.653 1.625-1.313 1.625h-.031z'
    })
  );
}
export default SvgPiedPiper;
