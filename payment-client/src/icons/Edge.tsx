import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgEdge(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M9.96 10.828c-2.616 1.629-4.112 3.942-4.112 3.942s.386-4.852 4.113-7.696C11.44 5.945 13.469 5 16.19 5c1.024 0 3.168.18 5.102 1.371 1.934 1.191 2.715 2.188 3.586 3.652.375.63.683 1.442.875 2.223.355 1.465.398 3.215.398 3.215v2.309H12.336s-.336 4.64 6.02 4.64c2.206 0 2.984-.348 3.71-.562 1.137-.336 2.235-1.086 2.235-1.086l.004 4.636S21.703 27 17.773 27c-1.105 0-2.27-.094-3.394-.457-.984-.32-3.04-1.18-4.418-3.195-.488-.711-1.016-1.66-1.277-2.586-.286-1.004-.282-1.977-.282-2.516 0-2.004.688-3.918 1.875-5.305 1.54-1.793 3.489-2.582 3.489-2.582s-.633.739-1.024 1.66c-.39.922-.5 1.848-.5 1.848h7.805s.457-4.664-4.414-4.664c-1.836 0-4.09.64-5.672 1.625z'
    })
  );
}
export default SvgEdge;