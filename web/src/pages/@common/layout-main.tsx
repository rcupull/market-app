import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useAuth } from 'features/api-slices/useAuth';
import { useSignOut } from 'features/api-slices/useSignOut';

import { useBreakpoints } from 'hooks/useBreakpoints';
import { useRouter } from 'hooks/useRouter';

import { Footer } from './footer';
import { FooterXs } from './footer-xs';

import { Navbar } from 'pages/@common/nav-bar';
import { ChildrenProp } from 'types/general';

export interface LayoutMainProps extends ChildrenProp {}

export const LayoutMain = ({ children }: LayoutMainProps): JSX.Element => {
  const { signOut } = useSignOut();
  const { authSignIn } = useAuth();
  const { isDashboardPage } = useRouter();
  const breakpoints = useBreakpoints();

  const renderFooter = () => {
    if (breakpoints.xs) {
      return <FooterXs className="flex-shrink-0 fixed bottom-0 left-0 right-0" />;
    }

    if (isDashboardPage) {
      return null;
    }

    return <Footer className="mt-auto flex-shrink-0" />;
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Navbar className="flex-shrink-0 fixed top-0 z-10" />

      <div className="mt-[64px]">{children}</div>

      {renderFooter()}

      {signOut.status.isBusy ||
        (authSignIn.status.isBusy && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-70">
            <SpinnerEllipsis />
          </div>
        ))}
    </div>
  );
};
