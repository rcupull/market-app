import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { UserRole } from 'types/auth';
import { ChildrenProp } from 'types/general';

export const AutenticatedRole = ({
  children,
  roles,
}: ChildrenProp & { roles: Array<UserRole> }) => {
  const { user } = useAuth();
  const { pathname } = useRouter();

  const { authSignInModal } = useAuthSignInModal();

  const role = user?.role;

  useEffect(() => {
    if (!user) {
      authSignInModal.open({ redirect: pathname });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && roles?.length && !roles.includes(role)) {
    return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};
