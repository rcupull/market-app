import { useEffect } from 'react';

import { TabItem, Tabs } from 'components/tabs';

import { useRouter } from 'hooks/useRouter';

import { dynamic } from 'utils/makeLazy';

const UsersPage = dynamic(() => import('./routes/users').then((m) => m));
const ShoppingPage = dynamic(() => import('./routes/purchase-orders').then((m) => m));
const BillingPage = dynamic(() => import('./routes/bills').then((m) => m));
const BusinessPage = dynamic(() => import('./routes/business').then((m) => m));
const NlpPage = dynamic(() => import('./routes/nlp').then((m) => m));
const SettingsPage = dynamic(() => import('./routes/settings').then((m) => m));

import { useAuth } from 'features/api-slices/useAuth';

import SvgCogSolid from 'icons/CogSolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import SvgTrainSolid from 'icons/TrainSolid';
import { LayoutSection } from 'pages/@common/layout-section';
import { compact, isString } from 'utils/general';
import { AdminTab, getAdminTabLabel } from 'utils/view';

export const Admin = () => {
  const { query, onChangeQuery } = useRouter();
  const { getHasSomeAccess } = useAuth();

  const tabsItems: Array<TabItem & { q: AdminTab }> = compact([
    getHasSomeAccess('user__read') && {
      q: 'users',
      label: getAdminTabLabel('users'),
      content: <UsersPage />,
      svg: SvgShoppingCartSolid
    },
    getHasSomeAccess('shopping__read') && {
      q: 'shopping',
      label: getAdminTabLabel('shopping'),
      content: <ShoppingPage />,
      svg: SvgShoppingCartSolid
    },
    getHasSomeAccess('business__read') && {
      q: 'business',
      label: getAdminTabLabel('business'),
      content: <BusinessPage />,
      svg: SvgMoneyBillAltSolid
    },
    getHasSomeAccess('full') && {
      q: 'nlp',
      label: getAdminTabLabel('nlp'),
      content: <NlpPage />,
      svg: SvgTrainSolid
    },
    getHasSomeAccess('bills__read') && {
      q: 'billing',
      label: getAdminTabLabel('billing'),
      content: <BillingPage />,
      svg: SvgMoneyBillAltSolid
    },
    {
      q: 'settings',
      label: getAdminTabLabel('settings'),
      svg: SvgCogSolid,
      content: <SettingsPage />
    }
  ]);

  useEffect(() => {
    if (!query.adminTab) {
      const adminTab: AdminTab = tabsItems[0].q;
      onChangeQuery({ adminTab });
    }
  }, []);

  const tabIndexToQuery = (tabIndex: number) => {
    return tabsItems[tabIndex]?.q;
  };
  const tabQueryToIndex = (tabQuery: string) => {
    return tabsItems.findIndex(({ q }) => tabQuery === q);
  };

  return (
    <>
      <LayoutSection>
        <Tabs
          tabListClassName="mt-4 shadow-lg hidden sm:flex"
          tabPanelClassName="w-full h-[calc(100vh-9rem)]"
          onSelect={(tabIndex) =>
            onChangeQuery(
              { adminTab: tabIndexToQuery(tabIndex) },
              {
                replaceAll: true
              }
            )
          }
          selected={isString(query.adminTab) ? tabQueryToIndex(query.adminTab) : undefined}
          items={tabsItems}
        />
      </LayoutSection>
    </>
  );
};

export default Admin;
