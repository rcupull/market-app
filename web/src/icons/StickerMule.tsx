import { createElement } from 'react';

import { StyleProps } from 'types/general';

export function SvgStickerMule(props: StyleProps) {
  return createElement(
    'svg',
    {
      viewBox: '0 0 32 32',
      width: '1em',
      height: '1em',
      ...props,
    },
    createElement('path', {
      d: 'M26.23 5c-.15 0-.513 1.032-.709 1.074-.217.054-1.161-.475-3.128.75-1.054.55-3.62 2.717-3.625 2.72-.28.197-.833.198-1.479.669-1.85 1.254-4.565.439-4.611.422-4.608-1.117-5.334-.634-6.625.478-.867.746-.987 1.521-1.008 1.621-.175.85.217 2.011.28 2.678.074.804-.113.69.32 4.049.02.042.171 0 .212.062 0 .35-.158.503-.171.541a1.22 1.22 0 000 .668c.096.342.341 1.512.341 1.916 0 1.741.019 1.832.11 2.057.162.417.52.38.707.5.129.146-.02.355.043.522.02.083.15.168.258.209.383.15 1.125.01 1.246-.106.067-.062.02-.186.129-.207.212 0 .45-.02.6-.103.211-.104.17-.251.062-.438-.017-.033-.293-.555-.409-.668-.087-.083-.212-.123-.3-.185-.242-.204-.428-.809-.428-.813-.192-.808-.43-1.89-.172-2.744.192-.717 1.646-3.654 1.65-3.658.171-.271.708-.48 1.137-.293.25.079.804.767 2.725 1.138 1.996.362 4.058-.082 4.674-.082.117.083-.08.69-.022 1.77 0 1.1-.016.571-.17 1.246-.092.404.142.966-.062 1.953-.058.408-.412 1.032-.342 1.477.02.042.042.081.062.144.021.187.062.355.192.418.304.15.5-.146.408.479-.029.129-.108.5.063.625.183.154 1.273.142 1.519.021.108-.062.068-.187.268-.308.079-.037.47-.018.47-.272.012-.075-.382-.828-.386-.832-.108-.146-.383-.188-.471-.334-.287-.42-.07-1.86.021-2.143.125-.458.233-.932.362-1.35.458-1.77.43-2.108.687-2.845.033-.075.268-.962.43-1.246.387-.708.902-1.35 1.394-1.975.75-.954 1.416-1.954 2.166-2.908.254-.292.342-.57.75-.332.45.237.902.291 1.33.707.609.533.426.76.493.955.062.208.32.438.62.397.434-.083.541-.106.557-.106.108-.02.238-.207.301-.332.13-.229.299-.375.299-.687.001-.325-.014-.12-.855-2.207-.321-.93-.213-.3-.559-1.537-.067-.271-.15-.605-.258-.834-.183-.362-.191-.313-.191-.397 0-.22 1.278-1.886.79-1.953-.236-.025-.507.482-.857.707-.358.175-.333.21-.43.21-.107 0-.236-.127-.257-.21-.085-.237.078-1.078-.15-1.078z',
    }),
  );
}
export default SvgStickerMule;
