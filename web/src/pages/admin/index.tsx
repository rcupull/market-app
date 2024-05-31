import { Route, Routes } from 'react-router-dom';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => m));
const Users = dynamic(() => import('./routes/users').then((m) => m));

export const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<Users />} />
    </Routes>
  );
};

export default Admin;
