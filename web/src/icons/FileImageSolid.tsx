import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileImageSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V9.594l-.281-.313-6-6L19.406 3zm2 2h10v6h6v16H8zm12 1.438L22.563 9H20zM21.094 14c-.551 0-1 .45-1 1s.449 1 1 1c.55 0 1-.45 1-1s-.45-1-1-1zM14 15.594l-.719.687-4 4 1.438 1.438L14 18.437l2.281 2.282.719.687.719-.687L19 19.437l2.281 2.282 1.438-1.438-3-3-.719-.687-.719.687L17 18.563l-2.281-2.282z'
    })
  );
}
export default SvgFileImageSolid;
