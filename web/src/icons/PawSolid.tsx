import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgPawSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M12.5 5c-1.07 0-2 .61-2.594 1.438C9.312 7.266 9 8.34 9 9.5s.313 2.234.906 3.063C10.5 13.39 11.43 14 12.5 14c1.07 0 2-.61 2.594-1.438.594-.828.906-1.902.906-3.062s-.313-2.234-.906-3.063C14.5 5.61 13.57 5 12.5 5zM16 9.5c0 1.16.313 2.234.906 3.063C17.5 13.39 18.43 14 19.5 14c1.07 0 2-.61 2.594-1.438.593-.828.906-1.902.906-3.062s-.313-2.234-.906-3.063C21.5 5.61 20.57 5 19.5 5c-1.07 0-2 .61-2.594 1.438C16.313 7.266 16 8.34 16 9.5zM12.5 7c.313 0 .656.156.969.594C13.78 8.03 14 8.727 14 9.5c0 .773-.219 1.469-.531 1.906-.313.438-.656.594-.969.594-.313 0-.656-.156-.969-.594C11.22 10.97 11 10.273 11 9.5c0-.773.219-1.469.531-1.906.313-.438.656-.594.969-.594zm7 0c.313 0 .656.156.969.594C20.78 8.03 21 8.727 21 9.5c0 .773-.219 1.469-.531 1.906-.313.438-.657.594-.969.594-.313 0-.656-.156-.969-.594C18.22 10.97 18 10.273 18 9.5c0-.773.219-1.469.531-1.906.313-.438.657-.594.969-.594zm-12 5c-1.07 0-2 .61-2.594 1.438C4.313 14.265 4 15.34 4 16.5s.313 2.234.906 3.063C5.5 20.39 6.43 21 7.5 21c1.07 0 2-.61 2.594-1.438.594-.828.906-1.902.906-3.062s-.313-2.234-.906-3.063C9.5 12.61 8.57 12 7.5 12zm17 0c-1.07 0-2 .61-2.594 1.438-.593.828-.906 1.902-.906 3.062s.313 2.234.906 3.063C22.5 20.39 23.43 21 24.5 21c1.07 0 2-.61 2.594-1.438.593-.828.906-1.902.906-3.062s-.313-2.234-.906-3.063C26.5 12.61 25.57 12 24.5 12zm-17 2c.313 0 .656.156.969.594C8.78 15.03 9 15.727 9 16.5c0 .773-.219 1.469-.531 1.906-.313.438-.656.594-.969.594-.313 0-.656-.156-.969-.594C6.22 17.97 6 17.273 6 16.5c0-.773.219-1.469.531-1.906.313-.438.657-.594.969-.594zm17 0c.313 0 .656.156.969.594.312.437.531 1.133.531 1.906 0 .773-.219 1.469-.531 1.906-.313.438-.657.594-.969.594-.313 0-.656-.156-.969-.594C23.22 17.97 23 17.273 23 16.5c0-.773.219-1.469.531-1.906.313-.438.657-.594.969-.594zM16 16c-1.332 0-2.262.867-2.719 1.625-.457.758-.734 1.39-1 1.656-.156.157-1.12.52-2.125 1.032-.504.257-1.011.601-1.437 1.125A3.285 3.285 0 008 23.5c0 1.922 1.578 3.5 3.5 3.5.867 0 1.77-.277 2.656-.531C15.043 26.215 16 26 16 26s.957.215 1.844.469c.886.254 1.789.531 2.656.531 1.922 0 3.5-1.578 3.5-3.5 0-.793-.293-1.52-.719-2.031-.426-.512-.937-.828-1.437-1.094-1-.531-1.985-.953-2.125-1.094-.239-.238-.508-.89-.969-1.656C18.29 16.859 17.34 16 16 16zm0 2c.66 0 .734.16 1.031.656.297.496.524 1.336 1.25 2.063.824.824 1.867 1.004 2.625 1.406.38.203.672.418.844.625.172.207.25.398.25.75 0 .84-.66 1.5-1.5 1.5-.29 0-1.223-.223-2.094-.469-.87-.246-1.59-.531-2.406-.531-.816 0-1.535.285-2.406.531-.871.246-1.805.469-2.094.469-.84 0-1.5-.66-1.5-1.5 0-.402.082-.61.25-.813.168-.203.473-.402.844-.593.746-.38 1.781-.532 2.625-1.375.734-.735.957-1.602 1.25-2.094.293-.492.363-.625 1.031-.625z'
    })
  );
}
export default SvgPawSolid;
