import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgBandAidSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M19.844 3c-.352.016-.657.094-.657.094l-.218.094-15.782 15.78-.093.22s-.078.304-.094.656c-.016.351.027.855.188 1.437.316 1.164 1.117 2.711 2.968 4.563 1.852 1.851 3.399 2.652 4.563 2.968.582.16 1.086.204 1.437.188.352-.016.656-.094.656-.094l.22-.093 15.78-15.782.094-.219s.078-.304.094-.656a4.794 4.794 0 00-.188-1.437c-.316-1.164-1.117-2.711-2.968-4.563-1.852-1.851-3.399-2.652-4.563-2.968A4.794 4.794 0 0019.844 3zm.093 2h.032c.156-.004.41.023.781.125.77.21 2.027.773 3.688 2.438l.093.125c1.559 1.593 2.14 2.816 2.344 3.562.102.371.129.625.125.781v.031L12.062 27h-.03c-.157.004-.41-.023-.782-.125-.77-.21-2.027-.773-3.688-2.438l-.125-.156c-1.53-1.574-2.109-2.789-2.312-3.531-.102-.371-.129-.625-.125-.781v-.032zM19 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-5.781 2.781L14.78 13.22l4 4 1.438-1.438zM22 12c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-8.781 2.781L11.78 16.22l4 4 1.438-1.438zM10 18c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z',
    }),
  );
}
export default SvgBandAidSolid;
