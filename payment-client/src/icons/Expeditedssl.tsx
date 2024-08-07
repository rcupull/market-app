import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgExpeditedssl(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S6 21.535 6 16 10.465 6 16 6zm.031 1.844a4.505 4.505 0 00-4.406 4.5v1.219c0 .21.164.374.375.374h.938a.37.37 0 00.374-.374v-1.22c0-1.523 1.168-2.82 2.688-2.874 1.598-.059 2.938 1.226 2.938 2.812v1.281c0 .211.164.376.375.376h.906a.37.37 0 00.375-.376v-1.156c0-2.515-2.047-4.61-4.563-4.562zm-5.593 6.5c-.461 0-.844.351-.844.812v6.469c0 .46.383.813.844.813H21.75c.46 0 .844-.352.844-.813v-6.469c0-.46-.383-.812-.844-.812zm.156.812h.375a.19.19 0 01.187.188v6.125a.19.19 0 01-.187.187h-.375a.19.19 0 01-.188-.187v-6.125a.19.19 0 01.188-.188zm5.469.813c.878 0 1.593.715 1.593 1.594a1.58 1.58 0 01-.781 1.375v1.5c0 .218-.188.375-.406.375h-.813c-.219 0-.406-.157-.406-.375v-1.5a1.58 1.58 0 01-.781-1.375c0-.88.715-1.594 1.594-1.594z'
    })
  );
}
export default SvgExpeditedssl;
