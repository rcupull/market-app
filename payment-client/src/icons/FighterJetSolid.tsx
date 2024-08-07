import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgFighterJetSolid(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props
    },
    createElement('path', {
      d: 'M7.875 4l1 9h-.844l-1.719-2.563-.28-.437h-4.25l.25 1.188L3 16l-.969 4.813L1.781 22h4.25l.282-.438L8.03 19h.844l-1 9h3.531l.313-.281L20.438 19H26c1.156 0 1.895-.672 2.563-1.219.667-.547 1.156-1.093 1.156-1.093l.656-.688-.656-.688s-.489-.546-1.157-1.093C27.895 13.672 27.157 13 26 13h-5.563L11.72 4.281 11.406 4zm2.25 2h.438l8.718 8.719.313.281H26c-.05 0 .727.328 1.281.781.137.114.133.114.25.219-.117.105-.113.105-.25.219-.554.453-1.332.781-1.281.781h-6.406l-.313.281L10.563 26h-.438l1-9H6.937l-.28.438L4.936 20H4.22l.75-3.813L5.03 16l-.062-.188L4.219 12h.718l1.72 2.563.28.437h4.188zM16 7l2 2h2l1-1-1-1zm2 16l-2 2h4l1-1-1-1z'
    })
  );
}
export default SvgFighterJetSolid;
