import { ButtonClose } from 'components/button-close';
import type { MapOlProps } from 'components/map';

import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useMapModal = () => {
  const { pushModal } = useModal();

  return {
    mapModal: {
      open: (args: {
        useMapModalArgs: () => { modalTitle?: string; primaryBtn: React.ReactElement } & MapOlProps;
      }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { useMapModalArgs } = args;

            const { modalTitle = 'Mapa', primaryBtn, ...mapProps } = useMapModalArgs();

            return {
              title: modalTitle,
              content: <Component {...mapProps} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn,
              className: '!w-[95vw]'
            };
          }
        });
      }
    }
  };
};
