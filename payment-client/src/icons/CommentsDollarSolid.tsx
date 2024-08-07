import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgCommentsDollarSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M2 3v18h4v5.094l1.625-1.313L12.344 21H22V3H2zm2 2h16v14h-8.344l-.281.219L8 21.906V19H4V5zm7 2v1.04c-1.121.187-2 1.163-2 2.335 0 .754.422 1.453 1.11 1.797L13 13.617c-.004.223-.16.383-.383.383h-1.234a.369.369 0 01-.383-.383V13H9v.617c0 1.172.875 2.156 2 2.344V17h2v-1.04c1.125-.187 2-1.17 2-2.343 0-.754-.43-1.449-1.105-1.789L11 10.378c.008.009 0 .001 0-.003 0-.223.156-.375.383-.375h1.234c.223 0 .383.16.383.383V11h2v-.617c0-1.172-.875-2.156-2-2.344V7h-2zm13 2v2h4v12h-4v2.906L20.344 23h-7.5l-2.5 2h9.312L26 30.094V25h4V9h-6z'
    })
  );
}
export default SvgCommentsDollarSolid;
