import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGrinTearsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.87 3 3.067 8.772 3.006 15.889a22.92 22.92 0 012.035-.692C5.454 9.507 10.205 5 16 5s10.546 4.506 10.959 10.197c.782.23 1.461.462 2.035.692C28.934 8.772 23.13 3 16 3zM9 14v2h5v-2H9zm9 0v2h5v-2h-5zM6 17s-2.97.835-3.559 1.424a1.51 1.51 0 002.135 2.135C5.166 19.969 6 17 6 17zm20 0s.835 2.97 1.424 3.559a1.51 1.51 0 002.135-2.135C28.969 17.834 26 17 26 17zM9 19s1.61 5 7 5 7-5 7-5H9zm-2.572 2.4a3.288 3.288 0 01-.438.573 3.506 3.506 0 01-1.1.742C7.173 26.475 11.292 29 16 29s8.828-2.525 11.11-6.285a3.49 3.49 0 01-1.1-.742 3.316 3.316 0 01-.438-.573C23.682 24.738 20.103 27 16 27c-4.103 0-7.681-2.262-9.572-5.6z'
    })
  );
}
export default SvgGrinTearsSolid;
