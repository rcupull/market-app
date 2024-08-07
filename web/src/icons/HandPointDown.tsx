import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHandPointDown(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10 2v5.594l-6.719 6.781-.281.313v.406C3 16.71 4.23 18 5.656 18c1.336 0 2.328-.469 2.969-.938.402-.292.469-.421.625-.625l.75-.187V27c0 1.645 1.355 3 3 3s3-1.355 3-3v-3.563l7.625-1.656A3.016 3.016 0 0026 18.844V2zm2 2h12v3H12zm-.594 5H24v9.844c0 .476-.313.898-.781 1l-8.438 1.781-.781.188V27c0 .566-.434 1-1 1-.566 0-1-.434-1-1V13.656l-1.25.313-2.25.594-.406.124-.188.344s-.086.18-.437.438c-.352.258-.91.531-1.813.531-.308 0-.48-.172-.562-.594z'
    })
  );
}
export default SvgHandPointDown;
