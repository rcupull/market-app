import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgScribd(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16.299 4.002C11.735 4.002 8 6.62 8 11.605c.01 1.681.43 3.021 1.232 3.96 1.466 1.778 4.25 1.885 5.698.42 1.183-1.204 1.349-3.353.039-4.565-.694-.665-1.613-.957-2.776-.693-.86.254-1.418.155-1.418-.774 0-2.434 3.031-3.82 5.543-3.781 2.17-.03 4.292.585 6.11 1.777l-1.34 1.916 1.857 1.223 2.502-3.576c-1.368-1.075-4.251-3.588-9.148-3.51zm5.367 11.004c-1.883-.097-3.521 1.385-3.492 3.326-.03.839.3 1.64.916 2.195.692.692 1.63.974 2.79.711.86-.254 1.415-.145 1.415.782 0 .204-.03.418-.068.623-.83 2.029-2.947 3.189-6.02 3.189a11.876 11.876 0 01-7.133-2.34l1.668-1.951-1.765-1.355-3.014 3.55.77.684A14.053 14.053 0 0017.177 28c2.546 0 4.673-.517 6.615-2.186 2.829-2.546 2.683-7.395 1.006-9.394a3.897 3.897 0 00-3.133-1.414z',
    }),
  );
}
export default SvgScribd;
