import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStaylinked(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16.055 4.006c-.13-.019-.298.008-.487.162l-9.404 7.574c-.19.15-.218.407-.055.57l1.924 1.95 7.809 7.717c.168.164.46.173.65.019l2.283-1.812-.013-.014.35-.281c.19-.15.208-.408.04-.57l-2.597-2.544c-.164-.164-.456-.171-.647-.021l-.004.004a.502.502 0 01-.646-.02l-4.303-4.29c-.164-.165-.14-.415.05-.57L15.2 8.538a.485.485 0 01.633.024l7.295 7.431a.495.495 0 00.64.024l2.083-1.672a.372.372 0 00.033-.57L16.31 4.114a.54.54 0 00-.256-.11zm-.563 5.842a.491.491 0 00-.324.105l-2.605 2.04c-.192.15-.21.406-.051.57l3.097 3.003c.164.164.45.174.637.024l.006-.004a.49.49 0 01.637.021l3.818 3.801a.376.376 0 01-.039.57l-4.238 3.46a.497.497 0 01-.647-.02l-6.908-6.895c-.159-.164-.442-.171-.633-.021l-2.082 1.63c-.19.15-.214.408-.055.571l9.49 9.166s.338.318.788-.037l9.004-7.66c.182-.15.199-.407.031-.57l-2.014-1.93-7.607-7.695a.444.444 0 00-.305-.13z',
    })
  );
}
export default SvgStaylinked;
