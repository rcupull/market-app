import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDropbox(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M11.781 4.469l-.625.406L4.47 9.188l-1.219.78 1.156.876 3.5 2.656-3.5 2.656-1.218.907 1.312.75 3.625 2.125v3.343l.438.282 6.874 4.53.563.376.563-.375 6.875-4.469.437-.313V19.97l3.625-2.157 1.219-.718-1.063-.907-3.343-2.843 3.312-2.719 1.094-.875L27.53 9l-6.5-4.125-.625-.375-.562.469L16 8.125l-3.656-3.156zm8.813 2.468l4.718 3.032-2.656 2.156-4.906-2.844zm-9 .032l2.75 2.343-4.719 3-2.906-2.218zM16 10.625l4.813 2.75-4.813 3-4.531-2.844zm6.656 3.938l2.625 2.25L22.47 18.5c-.09.04-.176.094-.25.156l-1.75 1.032-2.719-2.063zm-13.031.156l4.625 2.906-2.625 2.063-4.844-2.844zm6.406 4.094l3.75 2.875.563.406.562-.344.969-.594v1.063L16 26.062l-5.875-3.875v-1.062l1.063.625.593.344.531-.407z'
    })
  );
}
export default SvgDropbox;
