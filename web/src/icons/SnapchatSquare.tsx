import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSnapchatSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm9.12 2.998l-.235.006c-.493 0-2.172.148-2.965 2.033-.3.716-.184 1.995-.135 2.89a.476.476 0 01-.232.053c-.158 0-.345-.053-.553-.158-.264-.13-.715.068-.771.387-.035.184.04.454.597.686.215.094.728.2.848.496.05.124.031.281-.057.468-.003.004-.008.006-.008.01-.032.075-.764 1.856-2.396 2.14-.127.023-.214.143-.207.278.025.521 1.117.724 1.603.803.05.07.09.37.153.6.029.1.103.224.293.224s.467-.115.908-.115c.62 0 .832.15 1.318.514.35.262.97.741 1.71.681.732.034 1.223-.296 1.734-.681.483-.364.698-.514 1.318-.514.458 0 .69.107.908.107h.006c.155 0 .246-.081.285-.22.064-.23.104-.525.153-.596.94-.157 1.457-.378 1.58-.682.078-.198-.032-.367-.174-.406-1.632-.285-2.365-2.066-2.397-2.14l-.008-.01c-.084-.188-.103-.345-.054-.47.092-.235.44-.352.67-.43.064-.024.123-.043.172-.065.405-.168.61-.377.605-.621-.004-.191-.143-.362-.365-.448a.612.612 0 00-.48 0 1.326 1.326 0 01-.518.159.42.42 0 01-.201-.053c.049-.9.167-2.175-.133-2.89-.574-1.369-1.75-2.036-2.973-2.036z'
    })
  );
}
export default SvgSnapchatSquare;
