import { Route, Routes } from 'react-router-dom';

import { AuthenticatedAdmin } from 'components/autenticated-admin';

import { useInit } from 'hooks/useInit';

import { AuthenticatedUser } from './components/autenticated-user';

import { LayoutMain } from 'pages/@common/layout-main';
import { withPageProviders } from 'pages/@common/with-page-providers';
import { dynamic } from 'utils/makeLazy';

const Dashboard = dynamic(() => import('pages/dashboard').then((m) => ({ default: m.Dashboard })));
const Validate = dynamic(() => import('pages/validate').then((m) => ({ default: m.Validate })));
const ForgotPassword = dynamic(() =>
  import('pages/forgot-password').then((m) => ({ default: m.ForgotPassword })),
);

const Admin = dynamic(() => import('pages/admin').then((m) => ({ default: m.Admin })));

const AboutUs = dynamic(() => import('pages/about-us').then((m) => ({ default: m.AboutUs })));
const BusinessRouteName = dynamic(() =>
  import('pages/business-route-name').then((m) => ({ default: m.BusinessRouteName })),
);

const Price = dynamic(() => import('pages/price').then((m) => ({ default: m.Price })));
const NotFound = dynamic(() => import('pages/not-found').then((m) => ({ default: m.NotFound })));
const Home = dynamic(() => import('pages/home').then((m) => ({ default: m.Home })));

export const App = (): JSX.Element => {
  useInit();

  return (
    <Routes>
      <Route path="/" element={withPageProviders(<Home />, LayoutMain)} />

      <Route path="/not-found" element={withPageProviders(<NotFound />, LayoutMain)} />
      <Route path="/about-us" element={withPageProviders(<AboutUs />, LayoutMain)} />

      <Route path="/price" element={withPageProviders(<Price />, LayoutMain)} />

      <Route path="/validate/:code" element={withPageProviders(<Validate />, LayoutMain)} />
      <Route
        path="/forgot-password/:code"
        element={withPageProviders(<ForgotPassword />, LayoutMain)}
      />

      <Route
        path="/admin/*"
        element={withPageProviders(<Admin />, AuthenticatedAdmin, LayoutMain)}
      />

      <Route
        path="/dashboard/*"
        element={withPageProviders(<Dashboard />, AuthenticatedUser, LayoutMain)}
      />

      <Route path="/:routeName/*" element={withPageProviders(<BusinessRouteName />, LayoutMain)} />
    </Routes>
  );
};
