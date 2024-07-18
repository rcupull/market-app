import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';
import { TabItem, Tabs } from 'components/tabs';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { useRouter } from 'hooks/useRouter';

import { Billing } from './billing';
import { BusinessConfig } from './components/BusinessConfig';
import { Links } from './links';
import { Options } from './options';
import { PostsSections } from './posts-sections';
import { Products } from './products';
import { Settings } from './settings';
import { ShoppingPage } from './shopping';
import { BusinessTab, getBusinessTabLabel } from './utils';

import SvgCogSolid from 'icons/CogSolid';
import SvgLayerGroupSolid from 'icons/LayerGroupSolid';
import SvgLinkSolid from 'icons/LinkSolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgProductHunt from 'icons/ProductHunt';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { BannerInfoTelegramBusiness } from 'pages/@common/banner-info-telegram-business';
import { BannerInfoTotalDebitBusiness } from 'pages/@common/banner-info-total-debit-business';
import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutSection } from 'pages/@common/layout-section';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { compact, isString } from 'utils/general';

export const RouteName = () => {
  const { params, query, onChangeQuery } = useRouter();
  const { getEnabledFeature } = useAdminConfig();
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

  if (!businessOwnerData.owner) {
    return (
      <LayoutPage>
        <div className="flex items-center justify-center w-full h-96 text-2xl text-gray-500">
          No tiene acceso a este negocio
        </div>
      </LayoutPage>
    );
  }

  const tabsItems: Array<TabItem & { q: BusinessTab }> = compact([
    {
      q: 'products',
      label: getBusinessTabLabel('products'),
      content: <Products />,
      svg: SvgProductHunt,
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
      content: <ShoppingPage />,
      svg: SvgShoppingCartSolid,
    },
    {
      q: 'settings',
      label: getBusinessTabLabel('settings'),
      svg: SvgCogSolid,
      content: <Settings />,
    },
    getEnabledFeature('BILLIING_THE_BUSINESS') && {
      q: 'billing',
      label: getBusinessTabLabel('billing'),
      content: <Billing />,
      svg: SvgMoneyBillAltSolid,
    },
  ]);

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
        title={
          query.businessTab && (
            <span className="ml-2 sm:hidden">
              {getBusinessTabLabel(query.businessTab as BusinessTab)}
            </span>
          )
        }
        topRightHeader={
          <div className="flex items-center gap-6">
            <BannerInfoTelegramBusiness className="hidden sm:flex" />

            <BannerInfoTotalDebitBusiness className="hidden sm:flex" />

            <Options
              business={business}
              onRefresh={() => businessOwnerData.onFetch({ routeName })}
            />
          </div>
        }
      >
        <Tabs
          tabListClassName="mt-4 shadow-lg hidden sm:flex"
          tabPanelClassName="w-full overflow-y-auto h-[calc(100vh-12rem)]"
          onSelect={(tabIndex) =>
            onChangeQuery(
              { businessTab: tabIndexToQuery(tabIndex) },
              {
                replaceAll: true,
              }
            )
          }
          selected={isString(query.businessTab) ? tabQueryToIndex(query.businessTab) : undefined}
          items={tabsItems}
        />
      </LayoutSection>
    </>
  );
};

export default RouteName;
