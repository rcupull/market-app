import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFontAwesome(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm5.5 2a1.5 1.5 0 00-1.498 1.5H11V22a1 1 0 002 0v-4.256c.782-.288 1.645-.51 2.479-.51 1.579 0 2.19.817 3.505.817.94 0 1.814-.318 2.631-.67.205-.088.381-.176.381-.381h.006v-5.62c0-.204-.206-.38-.441-.38-.294 0-1.521.787-2.631.787-.23 0-.436-.03-.64-.117-.994-.377-1.87-.67-2.98-.67-.49 0-.99.077-1.482.195A1.5 1.5 0 0012.5 9z'
    })
  );
}
export default SvgFontAwesome;
