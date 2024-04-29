import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgOsi(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16c0 5.125 3.215 9.504 7.75 11.219l.938.375.374-.938 2.47-6.562.343-.938-.938-.343A3 3 0 0113 16c0-1.668 1.332-3 3-3s3 1.332 3 3a3 3 0 01-1.938 2.813l-.937.343.344.938 2.468 6.562.375.938.938-.375C24.785 25.504 28 21.125 28 16c0-6.617-5.383-12-12-12zm0 2c5.535 0 10 4.465 10 10 0 3.922-2.316 7.203-5.594 8.844l-1.812-4.782C19.977 19.172 21 17.759 21 16c0-2.75-2.25-5-5-5s-5 2.25-5 5c0 1.758 1.023 3.172 2.406 4.063l-1.812 4.78C8.316 23.204 6 19.923 6 16c0-5.535 4.465-10 10-10z',
    }),
  );
}
export default SvgOsi;