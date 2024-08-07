import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHandRock(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 6a2.999 2.999 0 00-2.531 1.406A2.949 2.949 0 0011 7c-1.645 0-3 1.355-3 3v3.656l-2.094 2.688c-1.277 1.652-1.191 4.023.188 5.593l2.375 2.688A6.982 6.982 0 0013.719 27H19c3.855 0 7-3.145 7-7v-9c0-1.645-1.355-3-3-3-.535 0-1.031.156-1.469.406A2.999 2.999 0 0019 7c-.535 0-1.031.156-1.469.406A2.999 2.999 0 0015 6zm0 2c.566 0 1 .434 1 1v3h2v-2c0-.566.434-1 1-1 .566 0 1 .434 1 1v2h2v-1c0-.566.434-1 1-1 .566 0 1 .434 1 1v9c0 2.773-2.227 5-5 5h-5.281a4.97 4.97 0 01-3.75-1.688l-2.375-2.718a2.338 2.338 0 01-.094-3l.5-.657V18h2v-8c0-.566.434-1 1-1 .566 0 1 .434 1 1v2h2V9c0-.566.434-1 1-1z'
    })
  );
}
export default SvgHandRock;
