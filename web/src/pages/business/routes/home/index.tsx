import { useEffect, useRef } from 'react';

import { BusinessCardSimple } from 'components/business-card-simple';

import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useScrollBottom } from 'hooks/useScrollBottom';

import { Filters } from './Filters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useInfinityScrolling } from 'pages/dashboard/routes/business/routes/route-name/links/useInfinityScrolling';
import { GetAllBusinessQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getOneBusinessRoute } from 'utils/business';

export const Home = () => {
  const { getAllBusinessSummary } = useGetAllBusinessSummary();

  const filters = useFiltersVolatile<GetAllBusinessQuery>({
    onChange: (query) => getAllBusinessSummary.fetch(query),
  });

  const infinityScrolling = useInfinityScrolling({
    fetchPaginatedResources: getAllBusinessSummary,
    onFetch: ({ page }) => filters.onMergeFilters({ page }),
  });

  const refCardContainer = useRef<HTMLDivElement>(null);
  const { onScroll } = useScrollBottom(refCardContainer, infinityScrolling.onScrollBottom);

  useEffect(() => {
    filters.onRefresh();
  }, []);

  return (
    <LayoutPage title="Todos los negocios">
      <Filters onChange={(e) => filters.onMergeFilters(e)} />
      <LayoutPageSection isBusy={getAllBusinessSummary.status.isBusy} className="mt-20">
        <div ref={refCardContainer} onScroll={onScroll} className="overflow-y-auto max-h-50rem">
          <div className="flex flex-wrap gap-10 mt-6">
            {infinityScrolling.tableData?.map((businessSummary, index) => {
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
