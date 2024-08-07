import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFacebookMessenger(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.41 4 4 9.137 4 15.5c0 3.39 1.57 6.402 4 8.5v4.625l4.438-2.219c1.128.34 2.308.594 3.562.594 6.59 0 12-5.137 12-11.5S22.59 4 16 4zm0 2c5.559 0 10 4.266 10 9.5S21.559 25 16 25c-1.195 0-2.336-.227-3.406-.594l-.406-.125L10 25.375v-2.25l-.375-.313C7.406 21.063 6 18.442 6 15.5 6 10.266 10.441 6 16 6zm-1.125 6.344l-6.031 6.375 5.406-3 2.875 3.094 5.969-6.47-5.282 2.97z'
    })
  );
}
export default SvgFacebookMessenger;
