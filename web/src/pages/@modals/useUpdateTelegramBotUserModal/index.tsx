import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useUpdateTelegramBotUserModal = () => {
  const { pushModal } = useModal();

  return {
    updateTelegramBotUserModal: {
      open: (args?: { onAfterSuccess?: () => void }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { onAfterSuccess } = args || {};
            const { onClose } = useModal();

            return {
              title: 'Bot de Telegram',
              content: (
                <Component
                  onAfterSuccess={() => {
                    onClose();
                    onAfterSuccess?.();
                  }}
                />
              ),
              secondaryBtn: <ButtonClose />,
            };
          },
        });
      },
    },
  };
};
