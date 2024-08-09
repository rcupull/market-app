import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgResolving(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C9.857 3 4.711 7.288 3.361 13.025l.016-.005 11.559-3.33c1.809-.528 2.82-.605 4.132-.426 1.888.318 2.745 1.3 3.192 2.88l.564 1.97c.427 1.46.052 2.632-1.23 3.835-1.004.904-1.621 1.272-3.201 1.729l-4.82 1.38 11.478 1.413.506 1.777-2.504.697-14.936-1.94 1.17 4.106A12.893 12.893 0 0016 29c7.168 0 13-5.832 13-13S23.168 3 16 3zm2.04 8.73c-.536-.005-1.275.13-2.31.43l-9.86 2.83 1.5 5.17 10.37-3c2.41-.69 2.6-1.23 2.31-2.27l-.59-2.06c-.2-.687-.529-1.09-1.42-1.1zM3.007 16.133a12.9 12.9 0 001.94 6.678l-1.94-6.678z'
    })
  );
}
export default SvgResolving;