import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGuitarSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M26.594 3.063c-.106 0-.207.05-.313.156l-.75.75-.312-.313-.438.406.344.344-.438.407-.312-.313-.438.438.313.312-.719.75c-.215.215-.215.41 0 .625l-4.187 4.188c-.934-.747-1.93-1.313-2.875-1.594-1.758-.52-3.32-.145-4.532 1.062-.535.535-.863 1.188-1 1.969-.218 1.266-1.335 2.254-2.656 2.344-1.441.097-2.707.676-3.656 1.625-2.504 2.504-2.05 7.047 1.031 10.125C7.406 28.094 9.636 29 11.688 29c1.562 0 3.011-.543 4.093-1.625.95-.95 1.528-2.215 1.625-3.656.09-1.32 1.047-2.438 2.313-2.657.781-.136 1.465-.464 2-1 1.207-1.207 1.582-2.773 1.062-4.53-.172-.587-.48-1.184-.843-1.782l-1.47 1.469c.157.3.29.59.376.875.308 1.039.144 1.886-.532 2.562-.242.239-.53.371-.906.438-2.164.375-3.851 2.273-4 4.5-.062.949-.43 1.77-1.031 2.375-1.727 1.722-4.98 1.27-7.281-1.032-2.301-2.3-2.785-5.59-1.063-7.312.606-.602 1.426-.969 2.375-1.031 2.227-.149 4.121-1.836 4.5-4 .067-.375.196-.664.438-.906.465-.465.996-.688 1.625-.688.285 0 .613.059.937.156.63.188 1.332.559 2 1.063l-3.343 3.344A2.502 2.502 0 0011.5 18c0 1.378 1.121 2.499 2.5 2.499s2.5-1.121 2.5-2.5c0-.152-.035-.293-.063-.438l9.094-9.125c.215.215.442.215.657 0l.75-.75.312.313.406-.406-.312-.313.437-.437.219.437.406-.437-.312-.313.75-.75c.215-.215.215-.441 0-.656l-1.907-1.906a.51.51 0 00-.343-.156zM26.5 4.28l.438.438L25 6.625l-.406-.406zm.844.75l.437.438-1.937 1.906-.407-.438zM9.094 19.688l-1.406 1.406 3.218 3.218 1.406-1.406z',
    })
  );
}
export default SvgGuitarSolid;
