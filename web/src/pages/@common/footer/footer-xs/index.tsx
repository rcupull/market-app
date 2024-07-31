import { useAuth } from 'features/api-slices/useAuth';

import { FooterBusinessMenu } from './footer-business-menu';
import { FooterGeneralMenu } from './footer-general-menu';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterXsProps extends StyleProps {}

export const FooterXs = ({ className }: FooterXsProps) => {
  const { user, getIsBusinessUser } = useAuth();
  
  return (
    <footer
      className={cn('shadow-lg -scale-y-100 fixed bottom-0 left-0 right-0 bg-white p-1', className)}
    >
      <div className="flex items-center -scale-y-100 justify-start gap-3">
        <FooterGeneralMenu />

        {getIsBusinessUser(user) && <FooterBusinessMenu />}
      </div>
    </footer>
  );
};
