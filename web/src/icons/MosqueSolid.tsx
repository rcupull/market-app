import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgMosqueSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M6.438 4.156l-.907 2.5-1.468 4-.063.156V28h11v-3c0-.59.102-.848.188-1 .085-.152.183-.242.406-.406.113-.082.246-.176.406-.313.16.137.293.23.406.313.223.164.32.254.407.406.085.152.187.41.187 1v3h11V10.812l-.063-.187-1.53-4-.97-2.469-.906 2.5-1.468 4-.063.156V17h-.094c-.32-2.71-1.886-4.363-3.343-5.344-.813-.547-1.583-.93-2.063-1.25-.238-.16-.406-.3-.469-.375C16.97 9.957 17 9.988 17 10V9h-2v1c0-.012.031-.047-.031.031a2.312 2.312 0 01-.469.406c-.48.329-1.25.731-2.063 1.282-1.449.984-3.015 2.617-3.343 5.281H9v-6.188l-.063-.187-1.53-4zm.03 5.719L7 11.219V26H6V11.187zm19 0L26 11.219V26h-1V11.187zM16 11.781c.125.098.246.196.375.281.645.43 1.375.82 2.063 1.282 1.18.797 2.199 1.734 2.468 3.656h-9.812c.27-1.898 1.285-2.852 2.469-3.656.687-.469 1.417-.844 2.062-1.281.129-.09.25-.184.375-.282zM9 19h14v7h-4v-1c0-.824-.148-1.488-.438-2-.289-.512-.69-.832-.968-1.031-.278-.2-.41-.297-.469-.375-.059-.078-.125-.18-.125-.594h-2c0 .414-.066.516-.125.594-.059.078-.191.176-.469.375-.277.199-.68.52-.969 1.031-.289.512-.437 1.176-.437 2v1H9z',
    }),
  );
}
export default SvgMosqueSolid;