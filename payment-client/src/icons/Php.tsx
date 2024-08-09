import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPhp(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 7.168c-8.835 0-16 3.764-16 8.414s7.165 8.416 16 8.416 16-3.766 16-8.416-7.165-8.414-16-8.414zm0 .84c8.57 0 15.16 3.609 15.16 7.574S24.565 23.158 16 23.158c-8.57 0-15.16-3.611-15.16-7.576 0-3.965 6.595-7.574 15.16-7.574zm-1.943 1.668l-1.618 8.34h1.805l.932-4.78c1.469 0 2.077-.058 2.344.229.277.297.135.623-.627 4.55h1.83c.792-4.06 1.142-4.922.41-5.595-.697-.643-2.141-.53-3.7-.53l.43-2.214h-1.806zm-7.569 2.22L4.87 20.242h1.817l.43-2.217c2.032 0 3.295.148 4.462-.945 1.291-1.187 1.628-3.3.707-4.357-.48-.554-1.253-.827-2.3-.827H6.487zm14.192 0l-1.621 8.346h1.82l.43-2.217c2.137 0 3.32.124 4.462-.945 1.291-1.187 1.629-3.3.708-4.357-.48-.554-1.253-.827-2.301-.827H20.68zM9.336 13.211c1.135.032 1.784.272 1.51 1.697-.391 2.004-1.77 1.797-3.467 1.797l.678-3.492c.47 0 .9-.013 1.279-.002zm14.193 0c1.137.032 1.779.272 1.504 1.697-.396 2.033-1.815 1.797-3.467 1.797l.678-3.492c.473 0 .907-.013 1.285-.002z'
    })
  );
}
export default SvgPhp;