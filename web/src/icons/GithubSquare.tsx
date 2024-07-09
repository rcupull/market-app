import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgGithubSquare(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M5 5v22h22V5H5zm2 2h18v18H7V7zm8.908 2C11.99 9 9 11.975 9 15.885c0 3.133 1.967 5.815 4.783 6.758.365.064.492-.16.492-.342 0-.174-.007-1.142-.007-1.737 0 0-1.985.428-2.397-.841 0 0-.323-.818-.783-1.032 0 0-.643-.443.047-.435 0 0 .699.056 1.088.73.618 1.095 1.655.776 2.06.594.063-.452.247-.77.453-.951-1.579-.174-3.174-.404-3.174-3.117 0-.778.215-1.166.667-1.666-.072-.183-.317-.944.072-1.92.595-.183 1.951.761 1.951.761a6.93 6.93 0 011.775-.238c.603 0 1.215.088 1.778.239 0 0 1.356-.944 1.95-.762.389.984.142 1.738.071 1.92.452.5.73.889.73 1.666 0 2.728-1.666 2.943-3.244 3.117.262.222.485.642.485 1.308 0 .953-.008 2.136-.008 2.366 0 .182.127.403.484.34C21.088 21.699 23 19.018 23 15.885 23 11.975 19.827 9 15.908 9zm-4.345 9.486c-.056-.016-.104-.006-.12.026s.007.077.063.11c.048.023.103.016.119-.024.016-.032-.007-.08-.063-.112zm.253.237c-.026-.006-.052-.003-.072.017-.04.032-.032.095.016.15.048.04.11.064.15.024.04-.032.033-.094-.015-.15a.192.192 0 00-.079-.041zm.297.367a.095.095 0 00-.084.008c-.048.032-.048.105 0 .168.048.063.12.094.16.062.047-.032.047-.112 0-.174a.152.152 0 00-.076-.064zm.325.396a.09.09 0 00-.083.032c-.039.04-.023.117.04.173.063.064.141.074.181.026.04-.032.017-.12-.039-.176a.175.175 0 00-.1-.055zm.544.317c-.07-.016-.157.006-.173.062-.016.056.04.121.119.137.07.032.158-.002.174-.057.024-.055-.033-.118-.12-.142zm1.07.025c-.078.016-.134.072-.126.135.008.055.087.086.166.07.087-.016.143-.07.127-.127-.008-.056-.086-.087-.166-.078zm-.523.063c-.088 0-.15.047-.15.103 0 .063.063.112.158.104.088 0 .15-.048.15-.104 0-.064-.078-.111-.158-.103z',
    }),
  );
}
export default SvgGithubSquare;
