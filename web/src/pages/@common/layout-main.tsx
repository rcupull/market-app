import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { Footer } from './footer';
import { SideBar } from './side-bar';

import { Navbar } from 'pages/@common/nav-bar';
import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutMainProps extends ChildrenProp {}

export const LayoutMain = ({ children }: LayoutMainProps): JSX.Element => {
  const { isDashboardPage, isAdminPage } = useRouter();
  const { isAuthenticated } = useAuth();

  const smSideBar = (
    <div
      className={cn('min-w-64 hidden h-screen', {
        'sm:block': isDashboardPage || isAdminPage,
      })}
    >
      <SideBar />
    </div>
  );

  const xsSideBar = (
    <Popover className={cn('relative sm:hidden')}>
      {({ close, open }) => {
        return (
          <>
            {!open && (
              <Popover.Button as="div" className="absolute -top-3 z-10">
                <div className="flex w-14 cursor-pointer">
                  <div className="relative text-nowrap bg-indigo-600 text-gray-100 px-2 rounded-tr-3xl rounded-br-3xl">
                    Mis panel
                  </div>
                </div>
              </Popover.Button>
            )}

            <Transition
              show={open}
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-x-95"
              enterTo="opacity-100 scale-x-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-x-100"
              leaveTo="opacity-0 scale-x-95"
            >
              <Popover.Panel className="absolute z-10">
                <div className="min-w-64 h-screen" onClick={() => close()}>
                  <SideBar />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex flex-row-reverse mt-[64px]">
        <div
          className={cn(
            'w-full overflow-auto max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] flex flex-col',
            {
              'sm:w-[calc(100%-16rem)]': isDashboardPage || isAdminPage,
            },
          )}
        >
          <div className="p-3">{children}</div>

          <Footer className="mt-auto flex-shrink-0" />
        </div>

        {isAuthenticated && (
          <>
            {xsSideBar}
            {smSideBar}
          </>
        )}
      </div>

      <Navbar className="flex-shrink-0 fixed top-0" />
    </div>
  );
};
