import { Navigate } from 'react-router-dom';

import { ButtonNew } from 'components/button-new';

import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useBusinessUpdateNewModal } from 'pages/@modals/useBusinessUpdateNewModal';
import { getDashboardBusinessRoute } from 'utils/business';

export const Home = () => {
  const { allUserBusiness } = useAllUserBusiness();
  const { businessUpdateNewModal } = useBusinessUpdateNewModal();

  const firstBusiness = allUserBusiness.data?.[0];

  if (firstBusiness) {
    return <Navigate to={getDashboardBusinessRoute({ routeName: firstBusiness.routeName })} />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh]">
      <p className="text-xl text-center">
        Inicia en el mundo tecnológico publicando tu primer negocio online.
      </p>
      <ButtonNew
        className="mt-6"
        label="Crear mi primer negocio"
        onClick={() => {
          businessUpdateNewModal.open({
            onAfterSucess: (newBussiness) => {
              if (newBussiness) {
                allUserBusiness.refresh();
              }
            }
          });
        }}
      />
    </div>
  );
};

export default Home;
