import { Navigate, Route, Routes } from 'react-router-dom';

import { useInit } from 'hooks/useInit';

import { LayoutMain } from 'pages/@common/layout-main';
import { withPageProviders } from 'pages/@common/with-page-providers';
import { dynamic } from 'utils/makeLazy';

const NotFound = dynamic(() => import('pages/not-found').then((m) => m));
const General = dynamic(() => import('pages/general').then((m) => m));
const Home = dynamic(() => import('pages/home').then((m) => m));

export const App = (): JSX.Element => {
  useInit();

  return (
    <Routes>
      <Route path="/" element={withPageProviders(<Home />, LayoutMain)} />

      <Route path="/not-found" element={withPageProviders(<NotFound />, LayoutMain)} />
      <Route path="/general" element={withPageProviders(<General />, LayoutMain)} />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
