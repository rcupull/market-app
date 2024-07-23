import { useEffect } from 'react';

import { ButtonClose } from 'components/button-close';

import { useGetSpecialAccess } from 'features/api/admin/useGetSpecialAccess';
import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { User } from 'types/auth';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useAdminUpdateUserAccessModal = () => {
  const { pushModal } = useModal();

  return {
    adminUpdateUserAccessModal: {
      open: (args: { user: User; onAfterSuccess?: () => void }) => {
        pushModal(
          'Emergent',
          {
            useProps: () => {
              const portal = usePortal();
              const { onClose } = useModal();
              const { user, onAfterSuccess } = args;
              const { getSpecialAccess } = useGetSpecialAccess();

              useEffect(() => {
                getSpecialAccess.fetch();
              }, []);

              return {
                title: 'Accesos especiales del usuario',
                isBusy: getSpecialAccess.status.isBusy,
                content: getSpecialAccess.data && (
                  <Component
                    portal={portal}
                    user={user}
                    allSpecialAccess={getSpecialAccess.data.specialAccess}
                    onAfterSuccess={() => {
                      onAfterSuccess?.();
                      onClose();
                    }}
                  />
                ),
                secondaryBtn: <ButtonClose />,
                primaryBtn: <div ref={portal.ref} />,
                className: '!w-[95vw]',
              };
            },
          },
          { emergent: true }
        );
      },
    },
  };
};
