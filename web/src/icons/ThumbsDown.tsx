import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgThumbsDown(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M10.156 6c-1.41 0-2.64.996-2.937 2.375l-2.157 10C4.668 20.223 6.114 22 8 22h5.75l-.188.75c-.203.156-.332.223-.624.625-.47.64-.938 1.633-.938 2.969C12 27.77 13.29 29 14.906 29h.406l.313-.281L22.406 22H27V6zm0 2H21v12.594l-6.406 6.312c-.422-.082-.594-.254-.594-.562 0-.903.273-1.461.531-1.813.258-.351.438-.437.438-.437l.344-.188.124-.406.594-2.25.313-1.25H8c-.66 0-1.105-.574-.969-1.219l2.125-10c.102-.469.524-.781 1-.781zM23 8h2v12h-2z'
    })
  );
}
export default SvgThumbsDown;
