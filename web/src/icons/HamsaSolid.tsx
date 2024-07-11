import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHamsaSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3a4.001 4.001 0 00-3.705 2.51A3.462 3.462 0 0010.5 5C8.57 5 7 6.57 7 8.5V17H5.5A2.502 2.502 0 003 19.5c0 .684.273 1.323.771 1.8l4.952 4.76A10.444 10.444 0 0016 29c2.724 0 5.307-1.043 7.275-2.94l4.955-4.76c.497-.477.77-1.116.77-1.8 0-1.379-1.121-2.5-2.5-2.5H25V8.5C25 6.57 23.43 5 21.5 5c-.659 0-1.268.192-1.795.51A4.001 4.001 0 0016 3zm0 2c1.103 0 2 .897 2 2v8h2V8.5c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5V19h3.5c.275 0 .5.225.5.5a.502.502 0 01-.154.36l-4.955 4.757A8.46 8.46 0 0116 27a8.466 8.466 0 01-5.893-2.383l-4.95-4.758A.498.498 0 015.5 19H9V8.5c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5V15h2V7c0-1.103.897-2 2-2zm0 12c-3.495 0-5.738 3.305-5.832 3.445l-.37.555.37.555C10.262 21.695 12.505 25 16 25c3.495 0 5.738-3.305 5.832-3.445l.37-.555-.37-.555C21.738 20.305 19.495 17 16 17zm0 2c1.697 0 3.059 1.248 3.725 2-.667.752-2.03 2-3.725 2-1.697 0-3.059-1.248-3.725-2 .667-.752 2.03-2 3.725-2zm0 1a1 1 0 000 2 1 1 0 000-2z',
    }),
  );
}
export default SvgHamsaSolid;
