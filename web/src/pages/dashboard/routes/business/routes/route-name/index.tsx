import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';
import { Tabs } from 'components/tabs';

import { useRouter } from 'hooks/useRouter';

import { OptionsMenu } from './options-menu';
import { Posts } from './posts';
import { PostsSections } from './posts-sections';
import { PurchaseOrders } from './purchase-orders';
import { Settings } from './settings';

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

  if (isBusy) {
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
    <LayoutSection
      title={name}
      topRightHeader={
        <div className="flex items-center gap-6">
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
        className="mt-4"
        contentClassName="w-full overflow-y-auto h-[calc(100vh-12rem)]"
        onSelect={(businessTab) => onChangeQuery({ businessTab })}
        selected={query.businessTab as number | undefined}
        items={[
          {
            label: 'Configuración',
            content: <Settings />,
          },
          {
            label: 'Publicaciones',
            content: <Posts routeName={routeName} />,
          },
          {
            label: 'Grupos de publicaciones',
            content: <PostsSections routeName={routeName} />,
          },
          {
            label: 'Órdenes de compras',
            content: <PurchaseOrders routeName={routeName} />,
          },
        ]}
      />
    </LayoutSection>
  );
};
