import { useAuthSignOut } from 'features/api/auth/useAuthSignOut';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { useAuth } from './useAuth';

export const useSignOut = (): {
  signOut: ReturnType<typeof useAuthSignOut>['authSignOut'];
} => {
  const { authSignOut } = useAuthSignOut();
  const { authSignIn } = useAuth();

  const { data, status, fetch, reset } = useApiPersistent('useSignOut', authSignOut);

  return {
    signOut: {
      data,
      status,
      fetch: (args, options = {}) => {
        fetch(args, {
          ...options,
          onAfterSuccess: (response) => {
            authSignIn.reset();
            options?.onAfterSuccess?.(response);
          },
        });
      },
      reset,
    },
  };
};
