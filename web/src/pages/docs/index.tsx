import { Route, Routes } from 'react-router-dom';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => ({ default: m.Home })));

export const Docs = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
