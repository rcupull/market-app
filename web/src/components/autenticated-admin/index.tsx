import { AutenticatedRole } from 'components/autenticated-role';

import { ChildrenProp } from 'types/general';

export const AuthenticatedAdmin = ({ children }: ChildrenProp) => {
  return <AutenticatedRole roles={['admin']}>{children}</AutenticatedRole>;
};
