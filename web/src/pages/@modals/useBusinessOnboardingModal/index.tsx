import { useModal } from 'features/modal/useModal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessOnboardingModal = () => {
  const { pushModal } = useModal();

  return {
    businessOnboardingModal: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            const { status } = useBusiness();

            return {
              title: 'Configuración básica del negocio',
              content: <Component />,
              className: 'w-[98vw] !sm:w-[80vw]',
              isBusy: status.isBusy,
            };
          },
        });
      },
    },
  };
};
