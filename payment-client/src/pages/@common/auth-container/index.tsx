import { useAuth, UserAuthReturn } from 'features/api-slices/useAuth';

export interface AuthContainerProps {
  children?: (args: UserAuthReturn) => React.ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  const auth = useAuth();
  return children?.(auth);
};
