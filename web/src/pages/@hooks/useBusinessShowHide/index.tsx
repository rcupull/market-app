import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useUpdateOneBusinessAdmin } from 'features/api/admin/useUpdateOneBusinessAdmin';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';

import { Business } from 'types/business';

export const useBusinessShowHide = (): {
  onBusinessShowHide: (business: Business, options?: FetchOptions) => void;
} => {
  const { pushModal } = useModal();

  return {
    onBusinessShowHide: (business, options) => {
      const { hidden, routeName } = business;

      const { onAfterSuccess } = options || {};

      pushModal(
        'Confirmation',
        {
          useProps: () => {
            const { onClose } = useModal();
            const { updateOneBusiness } = useUpdateOneBusiness();
            const { updateOneBusinessAdmin } = useUpdateOneBusinessAdmin();
            const { isAdmin } = useAuth()

            const apiResource  = isAdmin ? updateOneBusinessAdmin : updateOneBusiness;

            return {
              className: 'max-w-lg',
              content: hidden
                ? 'Esta función mostrará todas tus publicaciones que no estén propiamente ocultas. ¿Estás seguro de continuar?'
                : 'Esta función ocultará todas tus publicaciones. ¿Estás seguro de continuar?',
              badge: <Badge variant="warning" />,
              primaryBtn: (
                <Button
                  label={hidden ? 'Mostrar' : 'Ocultar'}
                  isBusy={apiResource.status.isBusy}
                  onClick={() => {
                    apiResource.fetch(
                      {
                        routeName,
                        update: {
                          hidden: !hidden,
                        },
                      },
                      {
                        onAfterSuccess: (response) => {
                          onAfterSuccess?.(response);
                          onClose();
                        },
                      },
                    );
                  }}
                />
              ),
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
