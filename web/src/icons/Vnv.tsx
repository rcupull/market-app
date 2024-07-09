import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgVnv(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M.6 12c-1 0-.5.9-.5.9l2.7 5.6S3.4 20 5.1 20h1.8c1.7 0 2.3-1.5 2.3-1.5l2.7-5.6s.5-.9-.5-.9H9.8c-.6 0-.7.4-1 .9L7 16.6s-.2.7-1 .7-1-.7-1-.7l-1.9-3.7c-.3-.5-.4-.9-.9-.9H.6zm14.6 0c-1.7 0-2.3 1.5-2.3 1.5l-2.7 5.6s-.5.9.5.9h1.6c.5 0 .6-.4.9-.9l1.8-3.7s.2-.7 1-.7c.7 0 1 .7 1 .7l1.9 3.7c.2.5.4.9.9.9h1.6c1 0 .5-.9.5-.9l-2.7-5.6s-.6-1.5-2.3-1.5h-1.7zm5.5 0c-1 0-.5.9-.5.9l2.7 5.6s.6 1.5 2.3 1.5h1.7c1.7 0 2.3-1.5 2.3-1.5l2.7-5.6s.5-.9-.6-.9h-1.6c-.5 0-.6.4-.9.9L27 16.6s-.2.7-1 .7c-.7 0-1-.7-1-.7l-1.8-3.7c-.3-.5-.4-.9-.9-.9h-1.6z',
    }),
  );
}
export default SvgVnv;
