import { Route, Routes } from 'react-router-dom';

import { Settings } from './routes/settings';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => m));
const Users = dynamic(() => import('./routes/users').then((m) => m));

export const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default Admin;
