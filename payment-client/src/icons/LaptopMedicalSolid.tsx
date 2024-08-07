import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLaptopMedicalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 6v13.563l-2.281 2.314A2.444 2.444 0 002 23.594 2.418 2.418 0 004.406 26h23.188A2.418 2.418 0 0030 23.594a2.45 2.45 0 00-.719-1.719L27 19.562V6H5zm2 2h18v11H7V8zm8 2v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2zM6.437 21h19.125l2.313 2.281a.464.464 0 01.125.313.386.386 0 01-.406.406H4.406A.386.386 0 014 23.594c0-.11.047-.234.125-.313L6.438 21z'
    })
  );
}
export default SvgLaptopMedicalSolid;
