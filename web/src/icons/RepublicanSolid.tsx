import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRepublicanSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M10 7a6 6 0 00-6 6v3h22v-3a6 6 0 00-6-6H10zm5.014 3.148c.088 0 .179.042.23.125l.475 1.002 1.105.166c.191.026.281.27.127.399l-.797.783.182 1.094c.039.206-.154.346-.334.256l-.99-.514-.989.514a.231.231 0 01-.334-.256l.18-1.094-.797-.783c-.14-.13-.062-.374.143-.399l1.092-.166.488-1.002a.243.243 0 01.219-.125zm-6.01.014a.24.24 0 01.217.123l.486.998 1.102.166c.193.026.256.27.115.399l-.793.78.191 1.089a.239.239 0 01-.345.256l-.973-.512-.986.512c-.18.09-.371-.051-.346-.256l.191-1.088-.793-.781c-.154-.128-.065-.373.127-.399l1.104-.166.484-.998a.244.244 0 01.219-.123zm11.998.004a.27.27 0 01.228.125l.487.996 1.086.166c.19.026.28.27.127.397l-.793.78.191 1.087c.026.205-.167.345-.346.256l-.984-.51-.982.51c-.153.089-.371-.051-.332-.256l.177-1.086-.779-.781c-.153-.128-.076-.372.129-.397l1.098-.166.486-.996a.222.222 0 01.207-.125zM4 18v6a1 1 0 001 1h3a1 1 0 001-1v-3h8v3a1 1 0 001 1h3a1 1 0 001-1v-4h2v1.883c0 1.45.978 2.781 2.402 3.058A3.004 3.004 0 0030 22v-2.291a.707.707 0 00-.707-.709h-.584a.708.708 0 00-.709.709V22c0 .551-.449 1-1 1-.551 0-1-.449-1-1v-4H4z',
    }),
  );
}
export default SvgRepublicanSolid;
