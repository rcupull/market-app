import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useSignOut } from 'features/api-slices/useSignOut';

import { Footer } from './footer';

import { Navbar } from 'pages/@common/nav-bar';
import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutMainProps extends ChildrenProp {}

export const LayoutMain = ({ children }: LayoutMainProps): JSX.Element => {
  const { signOut } = useSignOut();

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex flex-row-reverse mt-[64px]">
        <div
          className={cn(
            'w-full overflow-auto max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] flex flex-col',
          )}
        >
          {children}

          <Footer className="mt-auto flex-shrink-0" />
        </div>
      </div>

      <Navbar className="flex-shrink-0 fixed top-0" />

      {signOut.status.isBusy && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-70">
          <SpinnerEllipsis />
        </div>
      )}
    </div>
  );
};
