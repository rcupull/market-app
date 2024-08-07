import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGiftSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12 5c-1.645 0-3 1.355-3 3 0 .352.074.684.188 1H4v6h1v13h22V15h1V9h-5.188A2.95 2.95 0 0023 8c0-1.645-1.355-3-3-3-1.75 0-2.938 1.328-3.719 2.438-.105.148-.187.292-.281.437-.094-.145-.176-.29-.281-.438C14.938 6.329 13.75 5 12 5zm0 2c.625 0 1.438.672 2.063 1.563.152.218.128.23.25.437H12c-.566 0-1-.434-1-1 0-.566.434-1 1-1zm8 0c.566 0 1 .434 1 1 0 .566-.434 1-1 1h-2.313c.122-.207.098-.219.25-.438C18.563 7.673 19.375 7 20 7zM6 11h20v2h-9v-1h-2v1H6zm1 4h18v11h-8V16h-2v10H7z'
    })
  );
}
export default SvgGiftSolid;
