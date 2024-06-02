import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';
import { Tabs } from 'components/tabs';

import { useRouter } from 'hooks/useRouter';

import { BusinessConfig } from './components/BusinessConfig';
import { Links } from './links';
import { OptionsMenu } from './options-menu';
import { PostsSections } from './posts-sections';
import { Products } from './products';
import { PurchaseOrders } from './purchase-orders';
import { Settings } from './settings';

import SvgAddressCard from 'icons/AddressCard';
import SvgCogSolid from 'icons/CogSolid';
import SvgLayerGroupSolid from 'icons/LayerGroupSolid';
import SvgLinkSolid from 'icons/LinkSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { KpiCredit, KpiTelegram, KpiToPay } from 'pages/@common/kpis-business';
import { LayoutSection } from 'pages/@common/layout-section';
import { useBusiness } from 'pages/@hooks/useBusiness';

export const RouteName = () => {
  const { params, query, onChangeQuery } = useRouter();
  const { routeName } = params;

  const businessOwnerData = useBusiness();

  useEffect(() => {
    if (routeName) {
      businessOwnerData.onFetch({ routeName });
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

  const { name, hidden } = business;

  return (
    <>
      <BusinessConfig business={business} />
      <LayoutSection
        title={name}
        topRightHeader={
          <div className="flex items-center gap-6">
            <KpiTelegram className="hidden sm:flex" />

            <KpiCredit className="hidden sm:flex" />

            <KpiToPay className="hidden sm:flex" />

            {hidden && (
              <div className="text-red-500 ring-1 ring-red-400 rounded-3xl px-2 py-1/2 text-sm sm:text-lg">
                Oculto
              </div>
            )}

            <OptionsMenu
              business={business}
              onRefresh={() => businessOwnerData.onFetch({ routeName })}
            />
          </div>
        }
      >
        <Tabs
          className="mt-4 shadow-lg"
          contentClassName="w-full overflow-y-auto h-[calc(100vh-12rem)]"
          onSelect={(businessTab) => onChangeQuery({ businessTab })}
          selected={query.businessTab as number | undefined}
          items={[
            {
              label: 'Productos',
              content: <Products />,
              svg: SvgAddressCard,
            },
            {
              label: 'Enlaces',
              content: <Links />,
              svg: SvgLinkSolid,
            },
            {
              label: 'Secciones',
              content: <PostsSections />,
              svg: SvgLayerGroupSolid,
            },
            {
              label: 'Órdenes de compras',
              content: <PurchaseOrders />,
              svg: SvgShoppingCartSolid,
            },
            {
              label: 'Configuración',
              svg: SvgCogSolid,
              content: <Settings />,
            },
          ]}
        />
      </LayoutSection>
    </>
  );
};

export default RouteName;
