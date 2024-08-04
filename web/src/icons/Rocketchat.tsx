import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRocketchat(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7.549 5A7.763 7.763 0 004 5.85a7.899 7.899 0 012.836 4.45C5.066 11.855 4 13.84 4 16c0 2.1 1.003 4.11 2.84 5.717a7.873 7.873 0 01-1.758 3.406l-1.068 1.223 1.572.406c.64.166 1.3.248 1.963.248 2.228 0 4.293-.802 5.875-2.271 1.002.18 2.034.271 3.076.271 6.893 0 12.5-4.038 12.5-9s-5.607-9-12.5-9c-1.06 0-2.082.106-3.064.285A8.642 8.642 0 007.549 5zM16.5 9C22.29 9 27 12.14 27 16s-4.71 7-10.5 7c-1.088 0-2.161-.111-3.191-.332l-.551-.12-.387.409C11.147 24.252 9.47 24.976 7.641 25a9.757 9.757 0 001.28-3.521l.093-.583-.465-.36C6.906 19.255 6 17.645 6 16c0-3.86 4.71-7 10.5-7zm-5 6a1.5 1.5 0 000 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 000 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 000 3 1.5 1.5 0 000-3z'
    })
  );
}
export default SvgRocketchat;
