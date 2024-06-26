import { Route, Routes } from 'react-router-dom';

import { AuthenticatedAdmin } from 'components/autenticated-admin';

import { useInit } from 'hooks/useInit';

import { AuthenticatedUser } from './components/autenticated-user';

import { LayoutMain } from 'pages/@common/layout-main';
import { withPageProviders } from 'pages/@common/with-page-providers';
import { dynamic } from 'utils/makeLazy';

const Dashboard = dynamic(() => import('pages/dashboard').then((m) => m));
const Validate = dynamic(() => import('pages/validate').then((m) => m));
const ForgotPassword = dynamic(() => import('pages/forgot-password').then((m) => m));
const Settings = dynamic(() => import('pages/settings').then((m) => m));

const Admin = dynamic(() => import('pages/admin').then((m) => m));
const Docs = dynamic(() => import('pages/docs').then((m) => m));

const AboutUs = dynamic(() => import('pages/about-us').then((m) => m));
const Business = dynamic(() => import('pages/business').then((m) => m));
const TermsAndConditions = dynamic(() => import('pages/terms-and-conditions').then((m) => m));
const PrivacyPolicy = dynamic(() => import('pages/privacy-policy').then((m) => m));

const Price = dynamic(() => import('pages/price').then((m) => m));
const NotFound = dynamic(() => import('pages/not-found').then((m) => m));
const Home = dynamic(() => import('pages/home').then((m) => m));

export const App = (): JSX.Element => {
  useInit();

  return (
    <Routes>
      <Route path="/" element={withPageProviders(<Home />, LayoutMain)} />

      <Route path="/not-found" element={withPageProviders(<NotFound />, LayoutMain)} />
      <Route path="/about-us" element={withPageProviders(<AboutUs />, LayoutMain)} />
      <Route
        path="/terms-and-conditions"
        element={withPageProviders(<TermsAndConditions />, LayoutMain)}
      />

      <Route path="/privacy-policy" element={withPageProviders(<PrivacyPolicy />, LayoutMain)} />

      <Route path="/price" element={withPageProviders(<Price />, LayoutMain)} />

      <Route path="/validate/:code" element={withPageProviders(<Validate />, LayoutMain)} />
      <Route
        path="/forgot-password/:code"
        element={withPageProviders(<ForgotPassword />, LayoutMain)}
      />

      <Route path="/settings/*" element={withPageProviders(<Settings />, LayoutMain)} />

      <Route
        path="/admin/*"
        element={withPageProviders(<Admin />, AuthenticatedAdmin, LayoutMain)}
      />

      <Route path="/docs/*" element={withPageProviders(<Docs />, LayoutMain)} />

      <Route
        path="/dashboard/*"
        element={withPageProviders(<Dashboard />, AuthenticatedUser, LayoutMain)}
      />

      <Route path="/b/*" element={withPageProviders(<Business />, LayoutMain)} />
    </Routes>
  );
};
