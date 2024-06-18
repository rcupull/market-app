import { Route, Routes } from 'react-router-dom';

import { Settings } from './routes/settings';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => m));
const Users = dynamic(() => import('./routes/users').then((m) => m));
const PurchaseOrders = dynamic(() => import('./routes/purchase-orders').then((m) => m));
const Bills = dynamic(() => import('./routes/bills').then((m) => m));
const Business = dynamic(() => import('./routes/business').then((m) => m));

export const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      <Route path="shopping" element={<PurchaseOrders />} />
      <Route path="bills" element={<Bills />} />
      <Route path="business" element={<Business />} />
    </Routes>
  );
};

export default Admin;
