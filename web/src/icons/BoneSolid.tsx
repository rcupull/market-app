import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBoneSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M20 4c-2.2 0-4 1.8-4 4 0 1 .453 1.832 1.063 2.531l-6.532 6.531C9.832 16.453 9 16 8 16c-2.2 0-4 1.8-4 4s1.8 4 4 4c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1-.453-1.832-1.063-2.531l6.532-6.532C22.168 15.547 23 16 24 16c2.2 0 4-1.8 4-4s-1.8-4-4-4c0-2.2-1.8-4-4-4zm0 2c1.117 0 2 .883 2 2 0 .172-.027.348-.094.563l-.187.593.437.406.282.282.406.437.593-.187c.215-.067.391-.094.563-.094 1.117 0 2 .883 2 2s-.883 2-2 2c-.73 0-1.332-.387-1.688-.969l-.687-1.094-.875.907-7.906 7.906-.906.875 1.093.688c.582.355.969.957.969 1.687 0 1.117-.883 2-2 2s-2-.883-2-2c0-.172.027-.348.094-.563l.187-.593-.437-.407-.281-.28-.407-.438-.594.187c-.214.067-.39.094-.562.094-1.117 0-2-.883-2-2s.883-2 2-2c.73 0 1.332.387 1.688.969l.687 1.093.875-.906 7.906-7.906.907-.875-1.094-.688C18.387 9.332 18 8.73 18 8c0-1.117.883-2 2-2z'
    })
  );
}
export default SvgBoneSolid;
