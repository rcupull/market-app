import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useAuth } from 'features/api-slices/useAuth';
import { useSignOut } from 'features/api-slices/useSignOut';

import { useDebouncer } from 'hooks/useDebouncer';
import { useRouter } from 'hooks/useRouter';

import SvgUsersCogSolid from 'icons/UsersCogSolid';

const sessions: Array<{ email: string | null; password: string | null }> = [
  {
    email: null,
    password: null,
  },
  {
    email: 'rcupull@gmail.com',
    password: 'Qwerty@123',
  },
  {
    email: 'rcupull+admin2@gmail.com',
    password: 'Qwerty@123',
  },
  {
    email: 'rcupull+comerciante1@gmail.com',
    password: 'Qwerty@123',
  },
  {
    email: 'rcupull+comerciante2@gmail.com',
    password: 'Qwerty@123',
  },
  {
    email: 'rcupull+user1@gmail.com',
    password: 'Qwerty@123',
  },
  {
    email: 'rcupull+user2@gmail.com',
    password: 'Qwerty@123',
  },
];

export const DevSwitchSession = () => {
  const { isAuthenticated, authSignIn, authData } = useAuth();
  const { signOut } = useSignOut();
  const { pushRoute } = useRouter();
  const debouncer = useDebouncer();

  if (!DEVELOPMENT) {
    return <></>;
  }

  return (
    <Menu
      buttonElement={
        <IconButton
          title="Switch session (only development)"
          svg={<SvgUsersCogSolid className="!size-8" />}
        />
      }
      items={sessions.map(({ email, password }) => {
        if (email === null || password === null) {
          return {
            label: 'Ninguno',
            active: !authData?.user,
            onClick: () => {
              if (authData?.user?.email === email) return;

              if (isAuthenticated) {
                pushRoute('/');

                debouncer(() => {
                  signOut.fetch(undefined);
                }, 200);
              }
            },
          };
        }

        return {
          label: email,
          active: authData?.user?.email === email,
          onClick: () => {
            if (authData?.user?.email === email) return;

            if (isAuthenticated) {
              pushRoute('/');

              debouncer(() => {
                signOut.fetch(undefined, {
                  onAfterSuccess: () => {
                    authSignIn.fetch({ email, password });
                  },
                });
              }, 200);
            } else {
              authSignIn.fetch({ email, password });
            }
          },
        };
      })}
    />
  );
};
