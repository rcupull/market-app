import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileWord(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v26h20V3zm2 2h16v22H8zm10 7v6.5c0 .215-.285.5-.5.5-.043 0 .02.047-.063-.063-.082-.109-.207-.386-.28-.687C17.006 17.652 17 17 17 17v-2h-2v4.5c0 .215-.285.5-.5.5-.215 0-.5-.285-.5-.5V13h-4v2h2v4.5c0 1.383 1.117 2.5 2.5 2.5.984 0 1.688-.645 2.094-1.469.3.188.52.469.906.469 1.383 0 2.5-1.117 2.5-2.5V14h2v-2z'
    })
  );
}
export default SvgFileWord;
