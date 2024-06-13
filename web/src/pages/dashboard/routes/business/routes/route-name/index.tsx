import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';
import { TabItem, Tabs } from 'components/tabs';

import { useRouter } from 'hooks/useRouter';

import { Billing } from './billing';
import { BusinessConfig } from './components/BusinessConfig';
import { Links } from './links';
import { Options } from './options';
import { PostsSections } from './posts-sections';
import { Products } from './products';
import { PurchaseOrders } from './purchase-orders';
import { Settings } from './settings';
import { BusinessTab, getBusinessTabLabel } from './utils';

import SvgAddressCard from 'icons/AddressCard';
import SvgCogSolid from 'icons/CogSolid';
import SvgLayerGroupSolid from 'icons/LayerGroupSolid';
import SvgLinkSolid from 'icons/LinkSolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { KpiTelegram, KpiTotalDebit } from 'pages/@common/kpis-business';
import { LayoutSection } from 'pages/@common/layout-section';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { isString } from 'utils/general';

export const RouteName = () => {
  const { params, query, onChangeQuery } = useRouter();
  const { routeName } = params;

  const businessOwnerData = useBusiness();

  useEffect(() => {
    if (routeName) {
      businessOwnerData.onFetch({ routeName });

      if (!query.businessTab) {
        const businessTab: BusinessTab = 'products';
        onChangeQuery({ businessTab });
      }
    }
  }, [routeName]);

  const business = businessOwnerData.business;
  const { isBusy, isFailed, wasCalled } = businessOwnerData.status;

  if (isBusy && !business) {
    return (
      <div className="flex items-center justify-center size-full">
        <SpinnerEllipsis />
      </div>
    );
  }

  if (isFailed && wasCalled) {
    return <Navigate to="/dashboard/business" />;
  }

  if (!business || !routeName) {
    return <></>;
  }

  const { hidden } = business;

  const tabsItems: Array<TabItem & { q: BusinessTab }> = [
    {
      q: 'products',
      label: getBusinessTabLabel('products'),
      content: <Products />,
      svg: SvgAddressCard,
    },
    {
      q: 'links',
      label: getBusinessTabLabel('links'),
      content: <Links />,
      svg: SvgLinkSolid,
    },
    {
      q: 'sections',
      label: getBusinessTabLabel('sections'),
      content: <PostsSections />,
      svg: SvgLayerGroupSolid,
    },
    {
      q: 'shopping',
      label: getBusinessTabLabel('shopping'),
      content: <PurchaseOrders />,
      svg: SvgShoppingCartSolid,
    },
    {
      q: 'settings',
      label: getBusinessTabLabel('settings'),
      svg: SvgCogSolid,
      content: <Settings />,
    },
    {
      q: 'billing',
      label: getBusinessTabLabel('billing'),
      content: <Billing />,
      svg: SvgMoneyBillAltSolid,
    },
  ];

  const tabIndexToQuery = (tabIndex: number) => {
    return tabsItems[tabIndex]?.q;
  };
  const tabQueryToIndex = (tabQuery: string) => {
    return tabsItems.findIndex(({ q }) => tabQuery === q);
  };

  return (
    <>
      <BusinessConfig business={business} />
      <LayoutSection
        topRightHeader={
          <div className="flex items-center gap-6">
            <KpiTelegram className="hidden sm:flex" />

            <KpiTotalDebit className="hidden sm:flex" />

            {hidden && (
              <div className="text-red-500 ring-1 ring-red-400 rounded-3xl px-2 py-1/2 text-sm sm:text-lg">
                Oculto
              </div>
            )}

            <Options
              business={business}
              onRefresh={() => businessOwnerData.onFetch({ routeName })}
            />
          </div>
        }
      >
        <Tabs
          className="mt-4 shadow-lg hidden sm:flex"
          contentClassName="w-full overflow-y-auto h-[calc(100vh-12rem)]"
          onSelect={(tabIndex) => onChangeQuery({ businessTab: tabIndexToQuery(tabIndex) })}
          selected={isString(query.businessTab) ? tabQueryToIndex(query.businessTab) : undefined}
          items={tabsItems}
        />
      </LayoutSection>
    </>
  );
};

export default RouteName;
