import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStar(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 2.125l-.906 2.063-3.25 7.28-7.938.845-2.25.25 1.688 1.5 5.906 5.343-1.656 7.813-.469 2.187 1.969-1.125 6.906-4 6.906 4 1.969 1.125-.469-2.187-1.656-7.813 5.906-5.343 1.688-1.5-2.25-.25-7.938-.844-3.25-7.281zm0 4.906l2.563 5.782.25.53.562.063 6.281.656-4.687 4.22-.438.405.125.563 1.313 6.156-5.469-3.125-.5-.312-.5.312-5.469 3.125 1.313-6.156.125-.563-.438-.406-4.687-4.218 6.281-.657.563-.062.25-.531z'
    })
  );
}
export default SvgStar;
