import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGooglePlus(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11 7c-4.973 0-9 4.027-9 9s4.027 9 9 9 9-4.027 9-9c0-.617-.066-1.219-.188-1.8l-.046-.2H11v3h6c-.477 2.836-3.027 5-6 5-3.313 0-6-2.688-6-6 0-3.313 2.688-6 6-6 1.5 0 2.867.555 3.922 1.465l2.148-2.106A8.963 8.963 0 0011 7zm14 4v3h-3v2h3v3h2v-3h3v-2h-3v-3z'
    })
  );
}
export default SvgGooglePlus;
