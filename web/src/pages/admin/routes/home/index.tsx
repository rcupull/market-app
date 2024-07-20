import { Button } from 'components/button';

import { useAdminBDScript } from 'features/api/admin/useAdminBDScript';
import { useAuth } from 'features/api-slices/useAuth';

import { LayoutPage } from 'pages/@common/layout-page';

export const Home = () => {
  const { getHasSomeAccess } = useAuth();
  const { adminBDScript } = useAdminBDScript();

  return (
    <LayoutPage>
      {getHasSomeAccess('full') && (
        <Button label="Run BD script" onClick={() => adminBDScript.fetch()} />
      )}

      <div className="flex justify-center items-center w-full h-96">
        <span className="text-2xl text-gray-500 font-bold text-center">
          Bienvenido a la página de administración
        </span>
      </div>
    </LayoutPage>
  );
};

export default Home;
