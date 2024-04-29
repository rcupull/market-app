import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgLinode(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M11.5 3L5.531 4.906l4.344 2.657 6.375-2.407-4.375-2.093C11.77 3.007 11.605 3 11.5 3zM5 5.844l1.313 6.343c0 .106.113.208.218.313l3.813 3-1.031-7.031zm11.719.25l-6.313 2.375 1.063 6.969 5.25-2.72c.156-.054.25-.257.25-.468zm6.25 6.125a.562.562 0 00-.282.094l-2.968 1.874 3.468 2.157 3.188-2.313-3.156-1.719a.458.458 0 00-.25-.093zm-16.25 1.75l1.125 5.562c0 .106.05.227.156.282l3.469 3.25-.844-6zm10.312 0l-5.25 3 .719 6.093 4.531-3.03c.157-.106.274-.29.219-.5zm9.969.906l-.094.094c-.054.054-.043.125-.093.125l-3.22 2.187-.155 3.375v.188l2.875-2.25c.105-.106.167-.207.218-.313zm-8.406.063a.772.772 0 00-.313.093l-.093.063.156 4.437c0 .106-.008.27-.063.375l3.782-2.781-3.188-2.094a.55.55 0 00-.281-.094zm4.062 3.03l-4.218 2.938.125 3.625v.282l3.656-2.907c.105-.105.218-.218.218-.375zm-14.343 3.25l.78 4.22c0 .105.052.144.157.25L12.406 29l-.094-.219-.687-4.343zm9.124.063l-4.718 3.032.625 4.375.062.312 3.938-3.156a.468.468 0 00.218-.407z',
    }),
  );
}
export default SvgLinode;