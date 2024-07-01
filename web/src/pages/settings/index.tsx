import { Navigate } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { usePortal } from 'hooks/usePortal';

import { LayoutPage } from 'pages/@common/layout-page';
import { Component } from 'pages/@modals/useUserUpdateSettings/Component';

export const Settings = () => {
  const { authData, onRefreshAuthUser } = useAuth();

  const user = authData?.user;

  const portal = usePortal();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <LayoutPage title="Preferencias" backButton>
      <Component portal={portal} user={user} onAfterSuccess={onRefreshAuthUser} />

      <div ref={portal.ref} className="w-full sm:w-auto ml-0 sm:ml-auto mt-10" />
    </LayoutPage>
  );
};

export default Settings;
