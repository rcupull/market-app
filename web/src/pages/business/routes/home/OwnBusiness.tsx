import { Button } from 'components/button';
import { HighlightedBox } from 'components/highlighted-box';

import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { useBusinessUpdateNewModal } from 'pages/@modals/useBusinessUpdateNewModal';
import { getDashboardBusinessRoute } from 'utils/business';

export const OwnBusiness = () => {
  const { userCanCreateBusiness } = useAuth();
  const businessUpdateNewModal = useBusinessUpdateNewModal();
  const { allUserBusiness } = useAllUserBusiness();
  const { pushRoute } = useRouter();

  if (!userCanCreateBusiness) {
    return <></>;
  }

  if (!allUserBusiness.data?.length) {
    return (
      <HighlightedBox variant="info">
        <div className="flex flex-col sm:flex-row text-center sm:text-start items-center sm:items-start gap-3 sm:justify-between w-full text-lg text-gray-700">
          Parece que todavía no tienes ningún negocio en nuestra plataforma. Promociona tus
          productos con nosotros y te facilitaremos la visibilidad a todos tus clientes.
          <Button
            label="Agregar mi primer negocio"
            onClick={() => {
              businessUpdateNewModal.open({
                onAfterSucess: (business) => {
                  allUserBusiness.refresh();

                  business &&
                    pushRoute(
                      getDashboardBusinessRoute({
                        routeName: business.routeName,
                      })
                    );
                },
              });
            }}
          />
        </div>
      </HighlightedBox>
    );
  }

  return <></>;
};
