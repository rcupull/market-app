import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFutbolSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c.602 0 1.176.063 1.75.156L16 6.406l-1.75-1.25A11.21 11.21 0 0116 5zm-4.188.844l3.594 2.625.594.437.594-.437 3.593-2.625a11.074 11.074 0 014.125 2.968l-1.375 4.282-.218.687.593.406 3.625 2.657a10.996 10.996 0 01-1.53 4.843h-5.282l-.219.688-1.406 4.344a11.12 11.12 0 01-5.094-.031l-1.375-4.282-.219-.687H6.595c-.875-1.438-1.395-3.098-1.532-4.875l3.594-2.625.594-.406-.219-.688-1.406-4.25a11.007 11.007 0 014.188-3.031zM16 10.094l-.594.437-4.562 3.313-.563.437.219.688 1.75 5.344.219.687h7.062l.219-.688 1.75-5.343.219-.688-.563-.437-4.562-3.313zm9.75.812a10.947 10.947 0 011.094 3.406l-1.782-1.28zm-19.531.063l.687 2.062-1.75 1.281A10.906 10.906 0 016.22 10.97zM16 12.594l3.375 2.437L18.094 19h-4.188l-1.281-3.969zm5.594 11.094h2.25a10.75 10.75 0 01-2.938 2.156zm-13.438.03h2.188l.687 2.095a11.069 11.069 0 01-2.875-2.094z',
    })
  );
}
export default SvgFutbolSolid;
