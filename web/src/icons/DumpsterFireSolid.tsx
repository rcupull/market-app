import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDumpsterFireSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 6l-2 8h1.334l.332 2H3v2h2l1 6v2h2v-2h11.639c.297-.731.67-1.396 1.066-2H7.693l-1.332-8H25.64l-.543 3.256 1.459-1.106s2.096 1.731 2.218 1.85H29v-2h-1.668l.334-2H29l-2-8H5zm1.563 2h2.775l-.766 4h-3.01l1-4zm4.828 0H15v4h-4.37l.76-4zM17 8h3.61l.76 4H17V8zm5.662 0h2.776l1 4h-3.01l-.766-4zm3.867 10.66l-.648.56s-1.22.98-2.41 2.41C22.28 23.06 21 24.963 21 27.103c0 1.51.63 2.82 1.66 3.68 1.02.87 2.39 1.32 3.84 1.32 1.45 0 2.82-.45 3.84-1.32 1.03-.86 1.66-2.17 1.66-3.68 0-1.99-1.29-3.812-2.47-5.282a26.996 26.996 0 00-2.34-2.568l-.66-.592zm-.058 2.781c.39.38.75.7 1.5 1.63C29.04 24.41 30 26.13 30 27.1c0 .98-.37 1.68-.97 2.18-.18.16-.39.3-.62.41.05-.19.09-.39.09-.59 0-2.95-1.56-4.69-1.56-4.69s.05 2.63-.75 2.63c-.55 0-1.1-.85-1.1-.85s-.59 1.26-.59 2.91c0 .2.04.4.09.59-.23-.11-.44-.25-.62-.41-.6-.5-.97-1.2-.97-2.18 0-1.26.97-2.92 2.03-4.19.73-.87 1.06-1.13 1.44-1.47z'
    })
  );
}
export default SvgDumpsterFireSolid;
