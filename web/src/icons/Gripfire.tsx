import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGripfire(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15.686 1c.02.2.03.4.03.6C15.717 7.178 7 10.92 7 17.855c0 3.011 2.486 5.026 4.514 6.793 3.862 2.822 4.629 4.086 4.629 5.008 0 .611-.143 1.022-.143 1.344.768-1.011.857-1.926.867-2.803 0-1.789-1.258-3.409-2.592-5.242-.949-1.345-2.505-2.577-2.505-4.2 0-4.466 6.23-7.41 6.23-12.288C18 3.622 15.984 1.144 15.686 1zm3.689 8l.24.434c.141.31.205.654.205 1.03 0 2.694-3.482 6.706-3.634 7.038-.131.31-.186.643-.186.953 0 1.22.911 2.549 1.074 2.549.142 0 3.41-3.348 3.508-5.299.38.71.543 1.364.543 2.018 0 2.483-2.52 5.851-2.52 5.851 0 .698 1.922 3.203 2.14 3.203.064 0 .14-.076.194-.142C23.23 24.263 25 21.503 25 18.377a8.87 8.87 0 00-.13-1.486C24.14 12.868 20.373 9.388 19.374 9z'
    })
  );
}
export default SvgGripfire;
