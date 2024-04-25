import { Route, Routes } from 'react-router-dom';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => ({ default: m.Home })));
const Users = dynamic(() => import('./routes/users').then((m) => ({ default: m.Users })));

export const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<Users />} />
    </Routes>
  );
};
