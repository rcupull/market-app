import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPassportSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V3zm2 2h16v22H8zm8 3c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm.688 2.094c.484.082.937.23 1.343.469l.063.718-.469-.187-.375.312.063.906.968-.28 1.188.374-.313.531-.718-.437-.782.125-.75.563-.437 1.312.843.688s.891-.157.938-.157c.047 0 .375.813.375.813l-.5 1.531A4.01 4.01 0 0116 18c-.234 0-.465-.055-.688-.094l-.187-.312.469-1.75-1.781-1.344h-1.657l-.125-.25c-.004-.086-.031-.164-.031-.25 0-.215.031-.422.063-.625l.843-.656 1.781-.844-.28-1.156.78-.156.344.5 1.344-.25zm-3.625 6.625h.312l.594.718c-.34-.199-.64-.433-.906-.718zM10 22v2h12v-2z'
    })
  );
}
export default SvgPassportSolid;
