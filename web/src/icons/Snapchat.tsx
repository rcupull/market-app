import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgSnapchat(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M15.688 4a7.922 7.922 0 00-3.032.656c-1.316.567-2.742 1.657-3.625 3.594-.695 1.527-.484 3.434-.375 5-.16-.031-.293-.016-.531-.125a1.643 1.643 0 00-.688-.156c-.406 0-.753.11-1.093.312-.34.203-.735.531-.844 1.094-.066.352.035.875.344 1.25.308.375.765.64 1.375.875.144.055.254.117.375.156.258.078.539.157.718.25.18.094.208.168.188.125a.846.846 0 01-.094.25l-.031.032c-.027.058-1.441 3.132-4.313 3.593A1.273 1.273 0 003 22.22c.012.176.066.332.125.468.223.512.664.84 1.25 1.094.473.203 1.23.348 2.063.5.015.055.015.051.03.125.04.176.087.399.157.625.09.297.332.621.625.782.293.16.547.156.688.156.3 0 .488-.055.687-.094a5.774 5.774 0 011.156-.125c.262 0 .563.016.844.063.39.062.828.359 1.438.78.882.61 2.062 1.407 3.78 1.407h.063c.051 0 .117.004.156 0h.094c1.719 0 2.895-.797 3.782-1.406.609-.418 1.078-.719 1.468-.782a4.9 4.9 0 01.813-.062c.465 0 .797.059 1.156.125.25.047.45.094.688.094h.03c.231 0 .552-.063.813-.25.262-.188.403-.492.469-.719a9.85 9.85 0 00.156-.594c.016-.078.016-.07.032-.125.832-.152 1.59-.297 2.062-.5.586-.254 1.027-.582 1.25-1.093a1.48 1.48 0 00.125-.47c.035-.632-.422-1.21-1.031-1.312h-.032C26.5 20.676 25.45 19.84 24.72 19c-.73-.84-1.098-1.668-1.094-1.656-.008-.012-.031-.063-.031-.063a.846.846 0 01-.094-.25c-.02.043.008-.031.188-.125.18-.093.46-.172.718-.25.13-.039.262-.101.407-.156.535-.207.914-.41 1.218-.719.305-.308.508-.77.5-1.156-.015-.828-.625-1.285-1.218-1.5-.004 0 .003-.031 0-.031-.012-.004-.02.004-.032 0a1.98 1.98 0 00-.75-.125c-.18 0-.445.004-.781.156-.172.078-.273.059-.406.094.11-1.559.32-3.45-.375-4.969-.883-1.938-2.305-3.055-3.625-3.625A7.821 7.821 0 0016.25 4h-.063-.437c-.008 0 .027-.008-.063 0zm.062 2h.5c.398 0 1.316.055 2.281.469.965.414 1.953 1.156 2.625 2.625.309.68.324 2.652.219 4.25l-.031.062c-.016.223-.02.446-.032.656a.993.993 0 00.282.75c.117.118.574.329 1.062.438-.363.207-.773.477-1 1-.25.578-.136 1.18.094 1.719a.88.88 0 00.031.093c.004.008-.004.024 0 .032v.031c.008.012.024.02.032.031.078.18.492 1.106 1.406 2.157.61.699 1.52 1.351 2.593 1.875-.34.085-.492.167-1.03.25-.485.074-.852.511-.97.78-.109.247-.136.458-.187.688-.39-.07-.828-.156-1.406-.156-.375 0-.778.031-1.157.094-.964.156-1.644.676-2.25 1.093-.89.61-1.53 1.063-2.656 1.063-.039 0-.078.004-.125 0a.668.668 0 00-.125 0h-.062c-1.125 0-1.774-.453-2.656-1.063-.61-.417-1.282-.937-2.25-1.093a7.249 7.249 0 00-1.157-.094c-.605 0-1.039.063-1.375.125a3.27 3.27 0 00-.187-.625c-.114-.266-.461-.73-1-.813-.524-.078-.664-.164-1-.25 2.633-1.273 3.851-3.734 3.968-4v-.03c0-.005.028-.024.032-.032.015-.027.035-.047.062-.156l-.062-.032c.222-.539.375-1.117.125-1.687-.235-.54-.66-.824-1.031-1.031.464-.098.93-.239 1.093-.406a.993.993 0 00.281-.75c-.011-.235-.015-.47-.03-.72-.102-1.6-.122-3.57.187-4.25.672-1.468 1.664-2.21 2.625-2.624A5.998 5.998 0 0115.75 6z',
    }),
  );
}
export default SvgSnapchat;
