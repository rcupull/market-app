import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgChartLineSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M27.219 5.375l-3.5 4.375-3.282-1.656-.78-.375-.5.718-3.407 5.126-3.156-2.376L12 10.75l-.594.438-3.625 2.718-3.531-.875-.5 1.938 4 1 .469.125.375-.282L12 13.25l3.406 2.563.844.624.594-.875 3.5-5.25 3.218 1.594.72.344 4.5-5.625zm-7.157 12.938l-.843 1.062-3.407 4.25-3.218-2.438L12 20.75l-.594.438-3.5 2.625-3.468-1.72-.875 1.813 4 2 .53.25.5-.343L12 23.25l3.406 2.563.781.562.594-.75 3.125-3.906 3.25 4.843.782 1.125.843-1.062 4-5-1.562-1.25-3.125 3.906-3.25-4.843z'
    })
  );
}
export default SvgChartLineSolid;
