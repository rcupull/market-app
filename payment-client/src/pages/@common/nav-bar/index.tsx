import { NavBar as NavBarBase } from 'components/nav-bar';

import { BusinessMarketLogo } from '../business-market-logo';
import { NavbarMenu } from './NavbarMenu';
import { NotificationsMenu } from './NotificationsMenu';

import { StyleProps } from 'types/general';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  return (
    <NavBarBase
      className={className}
      preContent={
        <>
          <BusinessMarketLogo className="flex-shrink-0" />
        </>
      }
      items={[]}
      postContent={
        <>
          <NotificationsMenu />

          <NavbarMenu />
        </>
      }
    />
  );
};
