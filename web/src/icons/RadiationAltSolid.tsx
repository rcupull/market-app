import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgRadiationAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.086 0 11 4.914 11 11s-4.914 11-11 11S5 22.086 5 16 9.914 5 16 5zm-4.5 3.188C8.8 9.788 7 12.698 7 16h6.5c0-.898.512-1.688 1.313-2.188zm9 0l-3.188 5.624c.801.399 1.282 1.188 1.282 2.188H25c0-3.3-1.8-6.21-4.5-7.813zm-9.594 3l1.281 2.312c-.101.2-.18.3-.28.5H9.311c.301-1 .895-2.012 1.594-2.813zm10.188 0c.8.8 1.293 1.812 1.593 2.812h-2.593c-.102-.2-.18-.398-.282-.5zM16 14.405c-.898 0-1.594.696-1.594 1.594 0 .898.696 1.594 1.594 1.594.898 0 1.594-.696 1.594-1.594 0-.898-.696-1.594-1.594-1.594zm-1.313 3.781L11.5 23.813C12.8 24.613 14.398 25 16 25c1.602 0 3.2-.387 4.5-1.188l-3.188-5.625A2.83 2.83 0 0116 18.5c-.5 0-.914-.113-1.313-.313zm1 2.313h.626l1.28 2.313c-.5.101-1.093.187-1.593.187s-1.094-.086-1.594-.188z'
    })
  );
}
export default SvgRadiationAltSolid;
