import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgDeviantart(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M18.375 4l-.281.313-.407.375-.093.125-.063.125-1.781 3.375-.156.093H8.188v7.5h3.593l-3.469 6.625-.124.219V28h5.437l.281-.313.406-.375.094-.125.063-.125 1.781-3.375.156-.093h7.407v-7.5h-3.594l3.468-6.625.125-.219V4zm.844 2h2.593v2.781l-3.937 7.469-.281.594.406.5.344.406.281.344h3.188v3.5H15.78l-.281.187-.594.375-.187.157-.125.218L12.78 26h-2.594v-2.781l3.907-7.469.312-.563-.406-.53-.344-.407-.281-.344h-3.188v-3.5h6.032l.25-.187.593-.375.22-.156.124-.22z'
    })
  );
}
export default SvgDeviantart;
