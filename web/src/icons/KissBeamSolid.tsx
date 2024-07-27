import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgKissBeamSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.065 0 11 4.935 11 11s-4.935 11-11 11S5 22.065 5 16 9.935 5 16 5zm-5 7c-2.094 0-3.61 1.207-3.61 1.207l1.22 1.586S9.692 14 11.001 14s2.39.793 2.39.793l1.22-1.586C14.608 13.207 13.093 12 11 12zm10 0c-2.094 0-3.61 1.207-3.61 1.207l1.22 1.586S19.692 14 21.001 14s2.39.793 2.39.793l1.22-1.586C24.608 13.207 23.093 12 21 12zm-6 5.008v1.49c.902 0 1.477.415 1.477.63 0 .216-.572.626-1.467.63H15v1.492h.01c.895.003 1.467.414 1.467.629 0 .216-.576.63-1.477.63V24c1.669 0 2.977-.932 2.977-2.121 0-.532-.272-1.006-.711-1.375.439-.369.71-.843.71-1.375 0-1.19-1.307-2.121-2.976-2.121z',
    }),
  );
}
export default SvgKissBeamSolid;
