import { useEffect, useRef } from 'react';

import { BusinessCardSimple } from 'components/business-card-simple';
import { CardGroup } from 'components/card-group';
import { HeroSectionCentered } from 'components/hero-section-centered';

import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useScrollBottom } from 'hooks/useScrollBottom';

import { Highlights } from './components/highlights';
import { Inspiration } from './components/inspiration';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useInfinityScrolling } from 'pages/dashboard/routes/business/routes/route-name/posts/useInfinityScrolling';
import { GetAllBusinessQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getBusinessRoute } from 'utils/business';

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
    <LayoutPage>
      <HeroSectionCentered />

      <Inspiration />

      <Highlights className="px-10 sm:px-0 my-20" />

      <LayoutPageSection isBusy={getAllBusinessSummary.status.isBusy} className="mt-20">
        <div ref={refCardContainer} onScroll={onScroll} className="overflow-y-auto max-h-50rem">
          <CardGroup className="mt-6">
            {infinityScrolling.tableData?.map((businessSummary, index) => {
              return (
                <BusinessCardSimple
                  key={index}
                  businessSummary={businessSummary}
                  href={getBusinessRoute({ routeName: businessSummary.routeName })}
                  getImageSrc={getImageEndpoint}
                />
              );
            })}
          </CardGroup>
        </div>
      </LayoutPageSection>
    </LayoutPage>
  );
};
