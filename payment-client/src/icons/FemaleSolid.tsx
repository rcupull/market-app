import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFemaleSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 2c-2.2 0-4 1.8-4 4 0 1.129.488 2.145 1.25 2.875a4.531 4.531 0 00-.656.563c-.84.89-1.364 2.078-1.594 3.374h.031l-2 10L8.781 24H13v6h2v-6h2v6h2v-6h4.219l-.25-1.188-2-10c-.23-1.234-.73-2.41-1.563-3.312a4.752 4.752 0 00-.687-.625C19.492 8.145 20 7.137 20 6c0-2.2-1.8-4-4-4zm0 2c1.117 0 2 .883 2 2s-.883 2-2 2-2-.883-2-2 .883-2 2-2zm0 6c.828 0 1.422.316 1.938.875.515.559.921 1.387 1.093 2.313L20.781 22H11.22l1.75-8.813H13c.176-1 .559-1.84 1.063-2.374.503-.536 1.09-.813 1.937-.813z'
    })
  );
}
export default SvgFemaleSolid;
