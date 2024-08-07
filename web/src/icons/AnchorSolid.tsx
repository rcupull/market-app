import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAnchorSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4c-2.2 0-4 1.8-4 4 0 1.852 1.281 3.398 3 3.844V14h-3v2h3v7.969c-2.426-.192-4.04-1.078-5.188-2.094-.874-.773-1.46-1.625-1.874-2.344l1.593-.781-4-1.813L4.47 21.25l1.656-.813a11.118 11.118 0 002.344 2.938c1.453 1.29 3.597 2.355 6.531 2.563V26l1 1 1-1v-.063c2.934-.207 5.078-1.273 6.531-2.562a11.118 11.118 0 002.344-2.938l1.656.813-1.062-4.313-4 1.813 1.593.781c-.414.719-1 1.57-1.875 2.344-1.148 1.016-2.761 1.902-5.187 2.094V16h3v-2h-3v-2.156c1.719-.446 3-1.992 3-3.844 0-2.2-1.8-4-4-4zm0 2c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2z'
    })
  );
}
export default SvgAnchorSolid;
