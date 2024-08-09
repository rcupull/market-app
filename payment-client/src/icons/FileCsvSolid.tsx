import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFileCsvSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M6 3v7h2V5h16v5h2V3zm3.5 9A2.497 2.497 0 007 14.5v3C7 18.883 8.117 20 9.5 20s2.5-1.117 2.5-2.5V17h-2v.5c0 .215-.285.5-.5.5-.215 0-.5-.285-.5-.5v-3c0-.215.285-.5.5-.5.215 0 .5.285.5.5v.5h2v-.5c0-1.383-1.117-2.5-2.5-2.5zm6 0a2.497 2.497 0 00-2.5 2.5c0 1.383 1.117 2.5 2.5 2.5.215 0 .5.285.5.5 0 .3-.117.5-.5.5-.367 0-.426-.078-.438-.094-.011-.015-.062-.078-.062-.312h-2c0 .566.164 1.203.625 1.687.46.485 1.145.719 1.875.719 1.418 0 2.5-1.2 2.5-2.5 0-1.383-1.117-2.5-2.5-2.5-.215 0-.5-.285-.5-.5 0-.215.285-.5.5-.5.266 0 .348.063.406.125a.42.42 0 01.094.281h2c0-.59-.215-1.191-.656-1.656-.442-.465-1.11-.75-1.844-.75zm3.5 0v1.156l.063.156 2 6L22 22.157l.938-2.843 2-6 .062-.157V12h-2v.875l-1 3-1-3V12zM6 22v7h20v-7h-2v5H8v-5z'
    })
  );
}
export default SvgFileCsvSolid;