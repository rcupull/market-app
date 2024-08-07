import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRProject(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 5C8.268 5 2 9.253 2 14.5c0 4.785 5.218 8.733 12 9.393V26h4v-2.107a19.13 19.13 0 003.764-.743L23.33 26H28l-2.7-4.414c2.878-1.74 4.7-4.265 4.7-7.086C30 9.253 23.732 5 16 5zm1.5 3C23.299 8 28 11.134 28 15c0 2.13-1.432 4.034-3.684 5.318a3.064 3.064 0 00-.75-.459A4.493 4.493 0 0027 15.5a4.5 4.5 0 00-4.5-4.5H14v10.594C9.924 20.632 7 18.047 7 15c0-3.866 4.701-7 10.5-7zm.5 6h3.5a1.5 1.5 0 010 3H18v-3zm0 6h1.129c.558 0 1.07.304 1.338.793l.451.82c-.922.212-1.9.337-2.918.37V20z'
    })
  );
}
export default SvgRProject;
