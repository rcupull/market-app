import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGiftsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9 4v3.234L5.516 5.143 4.484 6.857 6.39 8H3v19h6v-2H5V10h8.027c.833-.62 1.857-1 2.973-1 .352 0 .682.042 1 .102V8h-3.389l1.905-1.143-1.032-1.714L11 7.234V4H9zm7 7c-1.645 0-3 1.355-3 3 0 .352.075.684.188 1H11v12h18V15h-2.188A2.93 2.93 0 0027 14c0-1.645-1.355-3-3-3-1.75 0-2.938 1.328-3.719 2.438-.105.147-.188.294-.281.439-.094-.145-.176-.29-.281-.44C18.937 12.328 17.75 11 16 11zm0 2c.625 0 1.438.671 2.063 1.563.152.218.129.231.25.439H16c-.566 0-1-.434-1-1A.985.985 0 0116 13zm8 0c.566 0 1 .434 1 1 0 .566-.434 1-1 1h-2.313c.122-.207.098-.22.25-.438C22.563 13.672 23.375 13 24 13zm-11 4h6v8h-6v-8zm8 0h6v8h-6v-8z'
    })
  );
}
export default SvgGiftsSolid;
