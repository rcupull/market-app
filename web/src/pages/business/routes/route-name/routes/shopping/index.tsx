import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { NotFound } from 'components/not-found';

import { useAuth } from 'features/api-slices/useAuth';

import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { dynamic } from 'utils/makeLazy';

const Home = dynamic(() => import('./routes/home').then((m) => m));
const ShoppingId = dynamic(() => import('./routes/shoppingId').then((m) => m));

export interface ShoppingProps {
  routeName: string;
}

export const Shopping = ({ routeName }: ShoppingProps) => {
  const { isAuthenticated } = useAuth();
  const authSignInModal = useAuthSignInModal();

  useEffect(() => {
    if (!isAuthenticated) {
      authSignInModal.open({redirect: false});
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <NotFound/>
  }

  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />
      <Route path=":shoppingId" element={<ShoppingId />} />
    </Routes>
  );
};

export default Shopping;
