import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';
import { getOneBusinessRoute } from 'utils/business';
import { dynamic } from 'utils/makeLazy';

const Posts = dynamic(() => import('./routes/posts').then((m) => m));
const Shopping = dynamic(() => import('./routes/shopping').then((m) => m));

const Home = dynamic(() => import('./routes/home').then((m) => m));

const AboutUs = dynamic(() => import('./routes/about-us').then((m) => m));

export const RouteName = () => {
  const { params } = useRouter();
  const { isAuthenticated } = useAuth();
  const { routeName } = params;

  const { business, onFetch, onReset, owner } = useBusiness();
  const cart = useCart();

  ////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!routeName) return;

    onFetch({ routeName });

    return () => {
      onReset();
    };
  }, [routeName]);

  ////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!routeName) return;

    if (isAuthenticated) {
      cart.onFetch();
    } else {
      cart.onReset();
    }

    return () => {
      cart.onReset();
    };
  }, [routeName, isAuthenticated]);
  ////////////////////////////////////////////////////////////////////////////////////

  if (!routeName || !business) return <></>;

  if (business?.hidden && !owner) {
    return (
      <LayoutPage>
        <div className="flex items-center justify-center h-96 w-full text-2xl text-gray-500">
          Este negocio no está disponible por ahora
        </div>
      </LayoutPage>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />

      <Route path="about-us" element={<AboutUs routeName={routeName} />} />

      <Route path="shopping/*" element={<Shopping routeName={routeName} />} />

      <Route path="posts/*" element={<Posts routeName={routeName} />} />

      <Route path="*" element={<Navigate to={getOneBusinessRoute({ routeName })} />} />
    </Routes>
  );
};

export default RouteName;
