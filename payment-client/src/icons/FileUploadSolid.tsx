import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileUploadSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V9.6l-.3-.3-6-6-.3-.3H6zm2 2h10v6h6v16H8V5zm12 1.4L22.6 9H20V6.4zM16 13l-4 4h3v5h2v-5h3l-4-4zm-4 10v2h8v-2h-8z'
    })
  );
}
export default SvgFileUploadSolid;
