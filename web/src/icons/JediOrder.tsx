import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgJediOrder(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M15.486 3l-.441 16.854-1.752-2.561 1.127 3.096-3.492.507 3.492.508-1.35 2.645 1.924-2.02c-.1 3.838-.123 4.782-.123 4.782s-8.613-4-3.826-12.838c0 0-5.97-6.591-.563-10.641 0 0-9.233 5.575-3.375 15.148 0 0-4.843-4.73-2.31-9.511 0 0-4.39 6.192.96 13.004 0 0-1.461-.897-2.755-4.334 0 0 .942 10.226 12.385 10.359h.228C27.051 27.866 28 17.641 28 17.641c-1.317 3.43-2.783 4.334-2.783 4.334 5.35-6.812.959-13.004.959-13.004 2.533 4.787-2.31 9.511-2.31 9.511C29.722 8.914 20.49 3.336 20.49 3.336c5.406 4.056-.562 10.639-.562 10.639 4.787 8.837-3.826 12.838-3.826 12.838s-.022-.944-.123-4.782l1.923 2.02-1.35-2.645 3.495-.508-3.494-.507 1.127-3.096-1.752 2.56C15.804 14.961 15.492 3.1 15.486 3z',
    })
  );
}
export default SvgJediOrder;
