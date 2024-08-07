import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileCode(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V9.594l-.281-.313-6-6L19.406 3zm2 2h10v6h6v16H8zm12 1.438L22.563 9H20zM16 13l-2 12h2l2-12zm-3.781 2.375l-2.5 3-.531.625.53.625 2.5 3 1.563-1.25L11.812 19l1.97-2.375zm7.562 0l-1.562 1.25L20.187 19l-1.968 2.375 1.562 1.25 2.5-3 .532-.625-.532-.625z'
    })
  );
}
export default SvgFileCode;
