import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgHandPeaceSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M15 2c-1.645 0-3 1.355-3 3v1.531l-.125-.406c-.477-1.574-2.176-2.477-3.75-2-1.574.477-2.477 2.176-2 3.75l2.594 8.438c-.188.074-.39.16-.594.28-.836.5-1.781 1.512-2.063 3.126-.21 1.195.02 2.246.188 2.812v.032l.781 2.5A7.002 7.002 0 0013.72 30H19c3.855 0 7-3.145 7-7v-9.906-.125-.063-.031c-.008-.031-.02-.063-.031-.094-.09-1.101-.758-2.129-1.844-2.562-.754-.301-1.547-.258-2.25.031a3.012 3.012 0 00-1.531-1.406A2.99 2.99 0 0018 8.906V5c0-1.645-1.355-3-3-3zm0 2c.566 0 1 .434 1 1v6.594l-1.031 2.625a3.146 3.146 0 00-.219 1.156l-4.094.531-2.594-8.625a.983.983 0 01.657-1.25c.539-.164 1.086.149 1.25.688l2.062 6.843 1.125-.343H14V5c0-.566.434-1 1-1zm4.188 6.625c.128-.004.277.012.406.063.523.21.773.789.562 1.312l-1.062 2.656v.031l-.407 1.032c-.019.054-.066.078-.093.125a3.05 3.05 0 00-1.813-.656c.012-.075 0-.145.032-.22l1.5-3.718c.156-.395.488-.617.875-.625zM22.968 12c.134 0 .274.012.407.063a.975.975 0 01.625.906V13c0 .121-.016.254-.063.375l-1.125 2.781c-.21.524-.789.774-1.312.563-.523-.211-.742-.79-.531-1.313l1.062-2.656c.016-.04.016-.086.032-.125.105-.262.296-.46.53-.563A.925.925 0 0122.97 12zM16.5 17.156a.95.95 0 011.156.719c.078.324.035.488-.062.656-.098.168-.305.375-.75.532L12 20.313a1 1 0 00-.625 1.437l.906 1.656a.997.997 0 001.36.39.997.997 0 00.39-1.358l-.281-.5 3.688-.97c.03-.007.062-.019.093-.03.774-.27 1.395-.731 1.782-1.375.316-.528.437-1.141.375-1.75.292.316.667.578 1.093.75A2.97 2.97 0 0024 17.905V23c0 2.773-2.227 5-5 5h-5.281c-2.2 0-4.133-1.43-4.781-3.531l-.75-2.5c-.083-.27-.247-1.215-.126-1.907.188-1.074.657-1.488 1.094-1.75.438-.261.75-.28.75-.28h.063l6.437-.845c.032-.007.063-.019.094-.03z'
    })
  );
}
export default SvgHandPeaceSolid;
