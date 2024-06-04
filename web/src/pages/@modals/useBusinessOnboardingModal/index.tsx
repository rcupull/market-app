import { useModal } from 'features/modal/useModal';

import { BusinessOnboardingSteps } from './types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessOnboardingModal = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { steps?: Array<BusinessOnboardingSteps> }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { status } = useBusiness();
            const { steps } = args || {};

            return {
              title: 'Configuración básica del negocio',
              content: <Component steps={steps} />,
              className: '!w-[80vw]',
              isBusy: status.isBusy,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
