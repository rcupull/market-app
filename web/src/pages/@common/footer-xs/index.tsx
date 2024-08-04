import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { FooterAdminOptions } from './footer-admin-options';
import { FooterBusinessOptions } from './footer-business-options';
import { FooterGeneralMenu } from './footer-general-menu';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterXsProps extends StyleProps {}

export const FooterXs = ({ className }: FooterXsProps) => {
  const { user, getIsBusinessUser, getIsAdmin, isAuthenticated } = useAuth();
  const { business, onFetch } = useBusiness();
  const { allUserBusiness } = useAllUserBusiness();

  return (
    <footer className={cn('shadow-lg -scale-y-100 bg-white px-2 py-1', className)}>
      <div
        className={cn('flex -scale-y-100  gap-3 overflow-x-auto h-[4.3rem]', {
          'items-start justify-start': isAuthenticated,
          'items-center justify-between': !isAuthenticated
        })}
      >
        <FooterGeneralMenu spread={!isAuthenticated} />

        {getIsAdmin(user) && <FooterAdminOptions />}

        {getIsBusinessUser(user) &&
          allUserBusiness.data?.map((userBusiness, index) => {
            return (
              <FooterBusinessOptions
                active={userBusiness.routeName === business?.routeName}
                key={index}
                business={userBusiness}
                //when refresh the userBusiness = currentBusiness
                onRefresh={() => {
                  business && onFetch({ routeName: business.routeName });
                  allUserBusiness.refresh();
                }}
              />
            );
          })}
      </div>
    </footer>
  );
};
