import { AutenticatedRole } from 'components/autenticated-role';

import { ChildrenProp } from 'types/general';

export const AuthenticatedUser = ({ children }: ChildrenProp) => {
  return <AutenticatedRole roles={['user']}>{children}</AutenticatedRole>;
};
