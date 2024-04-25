import { useEffect, useRef } from 'react';

import { BusinessCardSimple } from 'components/business-card-simple';
import { CardGroup } from 'components/card-group';
import { HeroSectionCentered } from 'components/hero-section-centered';

import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useScrollBottom } from 'hooks/useScrollBottom';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useInfinityScrolling } from 'pages/dashboard/routes/business/routes/route-name/posts/useInfinityScrolling';
import { GetAllBusinessQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getBusinessRoute } from 'utils/business';

export const Home = () => {
  const { getAllBusiness } = useGetAllBusiness();

  const filters = useFiltersVolatile<GetAllBusinessQuery>({
    onChange: (query) => getAllBusiness.fetch(query),
  });

  const infinityScrolling = useInfinityScrolling({
    fetchPaginatedResources: getAllBusiness,
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

      <div className="h-24 w-full bg-gray-200 rounded-md flex items-center justify-center">
        Porque elegirnos
      </div>
      <LayoutPageSection title="Nuestras tiendas" isBusy={getAllBusiness.status.isBusy}>
        {/* <div className="flex justify-end">
          <SearchFilter
            isBusy={getAllPosts.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div> */}

        <div ref={refCardContainer} onScroll={onScroll} className="overflow-y-auto max-h-50rem">
          <CardGroup className="mt-6">
            {infinityScrolling.tableData?.map((business, index) => {
              return (
                <BusinessCardSimple
                  key={index}
                  business={business}
                  href={getBusinessRoute({ routeName: business.routeName })}
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
