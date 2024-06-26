import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCopyrightSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-.094 5c-3.324 0-6 2.676-6 6s2.676 6 6 6c2.399 0 4.45-1.438 5.406-3.469l-1.812-.843C18.855 19.058 17.508 20 15.906 20c-2.277 0-4-1.723-4-4s1.723-4 4-4c1.602 0 2.95.941 3.594 2.313l1.813-.844C20.355 11.438 18.305 10 15.905 10z',
    })
  );
}
export default SvgCopyrightSolid;
