import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStarHalfAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 2.375l-.906 2.031-3.25 7.313-7.938.812-2.25.25 1.688 1.5 5.906 5.344-1.656 7.813-.469 2.187h.031L9.094 28.5 16 24.531l6.906 3.969 1.969 1.125-.469-2.188-1.656-7.812 5.906-5.344 1.688-1.5-2.25-.25-7.938-.812-3.25-7.313zm0 4.906l2.563 5.782.25.5.562.062 6.313.656-4.72 4.25-.437.375.125.563 1.313 6.187L16.5 22.5l-.5-.281z'
    })
  );
}
export default SvgStarHalfAltSolid;
