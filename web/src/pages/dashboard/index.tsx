import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { dynamic } from 'utils/makeLazy';

const Business = dynamic(() => import('./routes/business').then((m) => m));

export const Dashboard = () => {
  const { isUser } = useAuth();

  const businessOwnerData = useBusiness();

  useEffect(() => {
    return () => {
      businessOwnerData.onReset();
    };
  }, []);

  if (!isUser) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/business" />} />

      <Route path="business/*" element={<Business />} />
    </Routes>
  );
};

export default Dashboard;
