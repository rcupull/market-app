import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMedalSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7 3l4.266 10.36C8.71 14.948 7 17.774 7 21c0 4.962 4.037 9 9 9s9-4.038 9-9c0-3.225-1.71-6.051-4.266-7.64L25 3h-2.162l-3.912 9.498a8.908 8.908 0 00-2.06-.453L20.587 3h-2.162l-3.752 9.11a8.909 8.909 0 00-1.6.388L9.162 3H7zm4.412 0l2.541 6.174 1.082-2.627L13.575 3h-2.163zM16 14c3.859 0 7 3.14 7 7s-3.141 7-7 7-7-3.14-7-7 3.141-7 7-7zm0 3.162l-1.168 2.62-2.832.31 2.12 1.904-.597 2.81L16 23.378l2.477 1.43-.596-2.81L20 20.091l-2.832-.31L16 17.161z'
    })
  );
}
export default SvgMedalSolid;
