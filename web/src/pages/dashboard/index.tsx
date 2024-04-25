import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { dynamic } from 'utils/makeLazy';

const Business = dynamic(() =>
  import('./routes/business').then((m) => ({
    default: m.Business,
  })),
);

const Settings = dynamic(() =>
  import('./routes/settings').then((m) => ({
    default: m.Settings,
  })),
);

export const Dashboard = () => {
  const { isUser } = useAuth();

  if (!isUser) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/business" />} />

      <Route path="business/*" element={<Business />} />

      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};
