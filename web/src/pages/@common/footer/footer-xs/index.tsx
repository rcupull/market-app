import { useAuth } from 'features/api-slices/useAuth';

import { FooterBusinessOptions } from './footer-business-options';
import { FooterGeneralMenu } from './footer-general-menu';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterXsProps extends StyleProps {}

export const FooterXs = ({ className }: FooterXsProps) => {
  const { user, getIsBusinessUser } = useAuth();
  const { business, onFetch } = useBusiness();

  return (
    <footer
      className={cn('shadow-lg -scale-y-100 fixed bottom-0 left-0 right-0 bg-white p-1', className)}
    >
      <div className="flex items-center -scale-y-100 justify-start gap-3">
        <FooterGeneralMenu />

        {getIsBusinessUser(user) && business && (
          <FooterBusinessOptions
            business={business}
            onRefresh={() => onFetch({ routeName: business.routeName })}
          />
        )}
      </div>
    </footer>
  );
};
