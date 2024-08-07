import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGooglePlay(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7.75 3c-.074-.008-.14.027-.219.031-.066.004-.12-.011-.187 0h-.125c-.11.024-.215.067-.313.125a.958.958 0 00-.281.219C6.235 3.703 6 4.211 6 4.688v22.78c0 .493.219 1.087.75 1.376.04.02.086.015.125.031a1.626 1.626 0 001.438-.125h.03L17.75 23l4.781-2.875s4.055-2.453 4.594-2.781c.457-.278.883-.805.875-1.438-.008-.633-.445-1.101-.875-1.344-.137-.078-1.34-.8-2.438-1.468-1.05-.64-1.972-1.196-2.062-1.25a1.302 1.302 0 00-.094-.063L17.75 8.875s-8.7-5.277-9.219-5.594A2.018 2.018 0 007.75 3zM8 6.094l9.438 9.843L8 25.782zm4.813 2.125c1.765 1.07 3.906 2.375 3.906 2.375l3.687 2.25-1.593 1.656zm9.343 5.687c.383.235.735.442 1.5.906.836.508 1.418.833 1.907 1.126-.918.554-2.66 1.628-3.375 2.062l-1.97-2.063zm-3.343 3.5l1.593 1.657-3.687 2.25s-2.192 1.316-3.938 2.375z'
    })
  );
}
export default SvgGooglePlay;
