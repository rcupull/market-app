import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStoreAltSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M4 4v3.656l-3 4V12c0 1.645 1.355 3 3 3v13h16v-9h2v9h6V15c1.645 0 3-1.355 3-3v-.344l-3-4V4zm2 2h20v1H6zm-.5 3h21l2.406 3.219c-.11.433-.437.781-.906.781-.555 0-1-.445-1-1h-2c0 .555-.445 1-1 1-.555 0-1-.445-1-1h-2c0 .555-.445 1-1 1-.555 0-1-.445-1-1h-2c0 .555-.445 1-1 1-.555 0-1-.445-1-1h-2c0 .555-.445 1-1 1-.555 0-1-.445-1-1H9c0 .555-.445 1-1 1-.555 0-1-.445-1-1H5c0 .555-.445 1-1 1-.469 0-.797-.348-.906-.781zm.5 5.219c.531.48 1.234.781 2 .781s1.469-.3 2-.781c.531.48 1.234.781 2 .781s1.469-.3 2-.781c.531.48 1.234.781 2 .781s1.469-.3 2-.781c.531.48 1.234.781 2 .781s1.469-.3 2-.781c.531.48 1.234.781 2 .781s1.469-.3 2-.781V26h-2v-9h-6v9H6zM8 17v7h8v-7zm2 2h4v3h-4z'
    })
  );
}
export default SvgStoreAltSolid;
