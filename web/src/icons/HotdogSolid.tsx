import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHotdogSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M24.219 4c-1.235 0-1.965.496-2.5 1.313-.489-.07-.957-.125-1.344-.125-1.25 0-2.316.628-3.063 1.437-.722.781-1.19 1.734-1.593 2.688-.004.003-.028-.004-.031 0-1.04 1.953-2.145 4.519-5.907 6.28-2.8 1.321-4.16 3.25-4.5 5.157C4.488 21.246 4 21.98 4 23.313c0 2.078 1.5 3.28 3.375 3.812C8.438 28.265 9.859 29 11.625 29c3.07 0 6.676-2.02 11-6.5h.031C27.434 17.719 29 13.754 29 10.937c0-1.832-.508-3.136-1.469-3.78C27.81 4.878 25.711 4 24.22 4zm-3.844 3.188c.129 0 .3.019.469.03-.809 2.278-1.63 5.446-4.719 8.532-2.957 3.023-6.125 3.574-8.5 4.156.457-.87 1.336-1.715 3-2.5 4.324-2.027 5.832-5.289 6.813-7.125.023-.031.042-.062.062-.094.36-.87.793-1.69 1.281-2.218.489-.528.965-.782 1.594-.782zM24.969 9c.504-.023 1.074.066 1.75.313.14.34.281.851.281 1.624 0 2.07-1.2 5.606-5.75 10.157l-.031.031c-2.961 3.07-5.48 4.727-7.469 5.438-2.332-.149-4.918-1.946 4.125-8.563 3.66-2.676 3.555-8.824 7.094-9z',
    }),
  );
}
export default SvgHotdogSolid;
