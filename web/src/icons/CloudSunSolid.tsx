import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCloudSunSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M9 6v3.094a4.995 4.995 0 00-1.75.75L5.062 7.625 3.625 9.063l2.219 2.187a4.995 4.995 0 00-.75 1.75H2v2h3.125c.129.629.383 1.2.719 1.719l-2.219 2.218.625.625C4.113 20.02 4 20.5 4 21c0 2.758 2.242 5 5 5h16c2.758 0 5-2.242 5-5 0-2.02-1.21-3.82-3.031-4.594-.282-2.418-2.313-4.308-4.782-4.406A5.968 5.968 0 0017 9c-.227 0-.438.008-.656.031l-1.407-1.406-2.187 2.219A5.195 5.195 0 0011 9.125V6zm1 5c.766 0 1.445.285 1.969.75a6.064 6.064 0 00-.656 1.313 4.022 4.022 0 00-3.22 3.03c-.054.009-.105.02-.155.032C7.377 15.582 7 14.848 7 14c0-1.668 1.332-3 3-3zm7 0c1.605 0 3.055.96 3.688 2.438l.28.687.907-.094c.043-.008.078-.031.125-.031 1.652 0 2.996 1.352 3 2.938l-.031.968.781.188A2.996 2.996 0 0128 21c0 1.652-1.348 3-3 3H9c-1.652 0-3-1.348-3-3s1.348-3 3-3h1v-1c0-1.102.895-1.996 1.906-2l1 .063.188-.844C13.469 12.359 15.102 11 17 11z',
    }),
  );
}
export default SvgCloudSunSolid;