import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { getBusinessRoute } from 'utils/business';
import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => ({ default: m.Home })));
const ShoppingId = dynamic(() =>
  import('./routes/shoppingId').then((m) => ({ default: m.ShoppingId })),
);

export interface ShoppingProps {
  routeName: string;
}

export const Shopping = ({ routeName }: ShoppingProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={getBusinessRoute({ routeName })} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />
      <Route path=":shoppingId" element={<ShoppingId />} />
    </Routes>
  );
};
