import { Route, Routes } from 'react-router-dom';

import { BusinessMainBar } from '../@common/business-main-bar';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => ({ default: m.Home })));
const RouteName = dynamic(() =>
  import('./routes/route-name').then((m) => ({ default: m.RouteName }))
);

export const Business = () => {
  return (
    <>
      <BusinessMainBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":routeName/*" element={<RouteName />} />
      </Routes>
    </>
  );
};

export default Business;
