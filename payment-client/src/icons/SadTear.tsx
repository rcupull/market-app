import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSadTear(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm-4 4c-1.238 0-2.18.691-2.813 1.281-.632.59-1.03 1.156-1.03 1.156l1.687 1.126s.246-.434.687-.844C10.973 12.309 11.547 12 12 12h3v-2zm5 0v2h3c.453 0 1.027.309 1.469.719.441.41.687.844.687.844l1.688-1.126s-.399-.566-1.032-1.156C22.18 10.691 21.238 10 20 10zm-8.5 4S7 16.672 7 17.5a1.5 1.5 0 003 0c0-.828-1.5-3.5-1.5-3.5zm7.5 2c-2.336 0-3.934 1.234-4.813 2.406-.878 1.172-1.156 2.344-1.156 2.344L9.72 22H22.28l-.312-1.25s-.278-1.172-1.157-2.344C19.934 17.234 18.337 16 16 16zm0 2c1.672 0 2.566.766 3.188 1.594.152.207.113.215.218.406h-6.812c.105-.191.066-.2.219-.406C13.432 18.766 14.328 18 16 18z'
    })
  );
}
export default SvgSadTear;
