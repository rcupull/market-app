import { BreadCrumble } from 'components/bread-crumble';

import { useRouter } from 'hooks/useRouter';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { usePostIdPersistent } from 'pages/@hooks/usePostIdPersistent';
import { useShoppingIdPersistent } from 'pages/@hooks/useShoppingIdPersistent';
import { StyleProps } from 'types/general';
import {
  getBusinessAboutUsRoute,
  getDashboardRoute,
  getOneBusinessRoute,
  getOnePostRoute,
  getOneShoppingRoute,
  getShoppingRoute,
} from 'utils/business';

export interface AppBreadCrumbleProps extends StyleProps {}

export const AppBreadCrumble = ({ className }: AppBreadCrumbleProps): JSX.Element => {
  const { business } = useBusiness();
  const {
    isShoppingPage,
    isDashboardPage,
    isPostPage,
    isBusinessAboutUsPage,
    isHomePage,
    isOneBusinessPage,
    isAboutUsPage,
  } = useRouter();
  const shoppingIdPersistent = useShoppingIdPersistent();
  const postIdPersistent = usePostIdPersistent();

  return (
    <BreadCrumble
      items={[
        !isHomePage && {
          label: 'Asere Market',
          route: '/',
        },
        isAboutUsPage && {
          label: 'Sobre nosotros',
          route: '/about-us',
        },
        isDashboardPage && {
          label: 'Dashboard',
          route: getDashboardRoute(),
        },
        isOneBusinessPage &&
          business && {
            label: business.name,
            route: getOneBusinessRoute({ routeName: business.routeName }),
          },
        business &&
          isShoppingPage && {
            label: 'Compras',
            route: getShoppingRoute({ routeName: business.routeName }),
          },
        business?.aboutUsPage &&
          isBusinessAboutUsPage &&
          business.aboutUsPage.visible &&
          !!business.aboutUsPage.title && {
            label: business.aboutUsPage.title,
            route: getBusinessAboutUsRoute({ routeName: business.routeName }),
          },
        business &&
          isShoppingPage &&
          shoppingIdPersistent.data && {
            label: shoppingIdPersistent.data._id,
            route: getOneShoppingRoute({
              routeName: business.routeName,
              shoppingId: shoppingIdPersistent.data._id,
            }),
          },
        business &&
          isPostPage &&
          postIdPersistent.data && {
            label: postIdPersistent.data.name,
            route: getOnePostRoute({
              routeName: business.routeName,
              postId: postIdPersistent.data._id,
            }),
          },
      ]}
      className={className}
    />
  );
};
