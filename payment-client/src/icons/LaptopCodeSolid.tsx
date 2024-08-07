import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLaptopCodeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 6v13.563l-2.281 2.314A2.444 2.444 0 002 23.594 2.418 2.418 0 004.406 26h23.188A2.418 2.418 0 0030 23.594a2.45 2.45 0 00-.719-1.719L27 19.562V6H5zm2 2h18v11H7V8zm9 1l-1.5 9H16l1.5-9H16zm-3.914 2l-1.719 2.068L10 13.5l.367.432L12.086 16l1.086-.863L11.81 13.5l1.36-1.637L12.087 11zm7.828 0l-1.086.863L20.19 13.5l-1.36 1.637 1.085.863 1.719-2.068L22 13.5l-.367-.432L19.914 11zM6.437 21h19.125l2.313 2.281a.464.464 0 01.125.313.386.386 0 01-.406.406H4.406A.386.386 0 014 23.594c0-.11.047-.234.125-.313L6.438 21z'
    })
  );
}
export default SvgLaptopCodeSolid;
