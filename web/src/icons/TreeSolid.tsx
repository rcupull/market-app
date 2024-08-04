import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgTreeSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M16 3.594l-.719.687-5.937 5.969-1 .969 1.281.625s1.016.367 2.438.687l-4.407 4.406-1 .97 1.25.624s1.078.305 1.625.5l-3.594 3.594-.968 1 1.25.625S8.656 25.426 13 25.844V29h2v-3.031c.336.011.648.031 1 .031s.664-.02 1-.031V29h2v-3.156c4.352-.418 6.813-1.594 6.813-1.594l1.218-.625-.968-1-3.594-3.594c.547-.195 1.625-.5 1.625-.5l1.25-.625-1-.968-4.407-4.407c1.422-.32 2.438-.687 2.438-.687l1.281-.625-1-.969-5.937-5.969zm0 2.844l4 3.968c-.594.2-.715.356-2.188.5L16 11.094l-1.813-.188c-1.472-.144-1.593-.3-2.187-.5zm0 5l1.188 1.156 4.593 4.594c-.465.164-.453.218-1.406.406l-1.844.375 1.344 1.312 3.656 3.657C22.258 23.395 20.078 24 16 24c-4.04 0-6.21-.605-7.5-1.063l3.625-3.656 1.344-1.312-1.844-.375c-.953-.188-.941-.242-1.406-.407l4.594-4.593z'
    })
  );
}
export default SvgTreeSolid;
