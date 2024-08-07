import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgAssistiveListeningSystemsSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M24.75 1.375l-1.094 1.656a11.444 11.444 0 013.782 4.063l1.75-.969a13.383 13.383 0 00-4.438-4.75zm-1.688 2.5l-1.125 1.656c1.204.832 2.192 1.809 2.907 3.063l1.718-1c-.882-1.547-2.105-2.754-3.5-3.719zM17 5c-4.43 0-8 3.57-8 8h2c0-3.371 2.629-6 6-6s6 2.629 6 6c0 2.246-.652 3.473-1.375 4.688C20.902 18.901 20 20.168 20 22a3 3 0 01-3 3v2c2.746 0 5-2.254 5-5 0-1.168.598-1.973 1.375-3.281C24.152 17.41 25 15.652 25 13c0-4.43-3.57-8-8-8zm0 3c-2.746 0-5 2.254-5 5h2a3 3 0 016 0h2c0-2.746-2.254-5-5-5zm0 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3.781 1.938L9.03 19.155l2.813 2.813 1.219-1.188zM8 22c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'
    })
  );
}
export default SvgAssistiveListeningSystemsSolid;
