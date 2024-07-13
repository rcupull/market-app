import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGamepadSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 7C9.617 7 4.031 9.063 4.031 9.063l-.593.218-.063.594-1.344 10.25c-.363 2.836 1.664 5.48 4.5 5.844 2.64.34 5.008-1.442 5.625-3.969h7.688c.62 2.527 2.984 4.309 5.625 3.969 2.836-.364 4.863-3.008 4.5-5.844l-1.344-10.25-.063-.594-.593-.219S22.383 7 16 7zm0 2c5.484 0 10.008 1.523 10.75 1.781l1.219 9.625a3.159 3.159 0 01-2.75 3.563c-1.762.226-3.367-.989-3.594-2.75l-.031-.344-.125-.875H10.53l-.125.875-.031.344c-.227 1.761-1.832 2.976-3.594 2.75a3.159 3.159 0 01-2.75-3.563l1.219-9.625C5.992 10.523 10.516 9 16 9zm-7 3v2H7v2h2v2h2v-2h2v-2h-2v-2zm13 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z',
    })
  );
}
export default SvgGamepadSolid;
