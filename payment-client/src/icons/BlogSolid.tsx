import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBlogSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M14.52 4.01a.507.507 0 00-.52.51V6.5c0 .28.22.5.5.5v.02c6.23.24 11.24 5.25 11.48 11.48H26c0 .28.22.5.5.5h1.98c.29 0 .52-.24.51-.52-.27-7.86-6.61-14.2-14.47-14.47zm0 5a.514.514 0 00-.52.51v1.98c0 .28.22.5.5.5v.03c3.47.23 6.24 3 6.47 6.47H21c0 .28.22.5.5.5h1.98c.28 0 .52-.24.51-.52-.27-5.1-4.37-9.2-9.47-9.47zM5.5 10c-.28 0-.5.22-.5.5v11c0 3.58 2.92 6.5 6.5 6.5s6.5-2.92 6.5-6.5-2.92-6.5-6.5-6.5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5a2.5 2.5 0 010 5A2.5 2.5 0 019 21.5v-11c0-.28-.22-.5-.5-.5h-3z'
    })
  );
}
export default SvgBlogSolid;
