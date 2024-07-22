import { useEffect, useRef } from 'react';

import { BusinessCardSimple } from 'components/business-card-simple';

import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useScrollBottom } from 'hooks/useScrollBottom';

import { AdvertisementsMyFirstBusiness } from '../../../@advertisements/my-first-business';
import { AdvertisementsUserTypeCheck } from '../../../@advertisements/user-type-check';
import { Filters } from './Filters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useInfiniteScrolling } from 'pages/@hooks/useInfiniteScrolling';
import { GetAllBusinessQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getOneBusinessRoute } from 'utils/business';

export const Home = () => {
  const { getAllBusinessSummary } = useGetAllBusinessSummary();

  const filters = useFiltersVolatile<GetAllBusinessQuery>({
    onChange: (query) => getAllBusinessSummary.fetch(query),
  });

  const infiniteScrolling = useInfiniteScrolling({
    fetchPaginatedResources: getAllBusinessSummary,
    onFetch: ({ page }) => filters.onMergeFilters({ page }),
  });

  const refCardContainer = useRef<HTMLDivElement>(null);
  const { onScroll } = useScrollBottom(refCardContainer, infiniteScrolling.onScrollBottom);

  useEffect(() => {
    filters.onRefresh();
  }, []);

  return (
    <LayoutPage title="Todos los negocios">
      <AdvertisementsMyFirstBusiness />

      <AdvertisementsUserTypeCheck />

      <Filters onChange={(e) => filters.onMergeFilters(e)} />
      <LayoutPageSection isBusy={getAllBusinessSummary.status.isBusy} className="mt-20">
        <div ref={refCardContainer} onScroll={onScroll} className="overflow-y-auto max-h-50rem">
          <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-8 p-1">
            {infiniteScrolling.data?.map((businessSummary, index) => {
              return (
                <BusinessCardSimple
                  key={index}
                  businessSummary={businessSummary}
                  href={getOneBusinessRoute({ routeName: businessSummary.routeName })}
                  getImageSrc={getImageEndpoint}
                />
              );
            })}
          </div>
        </div>
      </LayoutPageSection>
    </LayoutPage>
  );
};
