import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPlaneSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3c-1.645 0-3 1.355-3 3v7.344l-8.406 3.75-.594.25v4.781l9-1v1.844l-2.563 1.718-.437.282v4.25l1.188-.25L16 28l4.813.969 1.187.25v-4.25l-.438-.282L19 22.97v-1.844l9 1v-4.781l-.594-.25L19 13.344V6c0-1.645-1.355-3-3-3zm0 2c.566 0 1 .434 1 1v8.656l.594.25L26 18.656v1.219l-9-1v5.188l.438.28L20 26.064v.718l-3.813-.75L16 25.97l-.188.062-3.812.75v-.718l2.563-1.72.437-.28v-5.188l-9 1v-1.219l8.406-3.75.594-.25V6c0-.566.434-1 1-1z'
    })
  );
}
export default SvgPlaneSolid;
