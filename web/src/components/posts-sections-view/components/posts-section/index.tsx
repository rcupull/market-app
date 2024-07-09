import { useEffect } from 'react';

import { WarningViewOnlyAdmin } from 'components/warning-view-only-admin';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useBreakpoints } from 'hooks/useBreakpoints';
import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useHotUpdateTableData } from 'hooks/useHotUpdateTableData';

import { PostsSectionCards } from '../posts-section-cards';
import { PostsSectionSearch } from '../posts-section-search';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { GetAllPostsQuery } from 'types/api';
import { PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { cn } from 'utils/general';

export interface PostsSectionProps extends StyleProps {
  index: number;
  routeName: string;
  layout: PostsLayoutSection;
}

export const PostsSection = ({ routeName, layout, className }: PostsSectionProps) => {
  const { business, onFetch } = useBusiness();
  const { name, hiddenName, postCategoriesTags, _id, showMobile, showPC, postType } = layout;

  const { getAllPosts } = useGetAllPosts();
  const { owner } = useBusiness();
  const breakpoints = useBreakpoints({ sweep: true });

  const isXs = breakpoints.xs && !breakpoints.sm;

  const notRenderMovile = isXs && !showMobile;
  const notRenderPC = !isXs && !showPC;

  const notRender = notRenderMovile || notRenderPC;

  const renderHiddenSection = notRender && owner;

  const hotUpdateTableData = useHotUpdateTableData<
    Post,
    { postId: string; stockAmountAvailable: number }
  >({
    data: getAllPosts.data,
    updateKey: `updatePostAmount`,
    findCB: (rowData, { postId }) => rowData._id === postId,
    changeCB: (rowData, { stockAmountAvailable }) => ({ ...rowData, stockAmountAvailable }),
  });

  const handleFilter = (filters: GetAllPostsQuery) => {
    const hasCategoriesTags = filters.postCategoriesTags?.length;

    getAllPosts.fetch({
      routeNames: [routeName],
      postCategoriesTags,
      postType,
      includeHidden: owner,
      ...filters,
      postCategoriesMethod: hasCategoriesTags ? 'every' : 'some',
    });
  };

  const filters = useFiltersVolatile<GetAllPostsQuery>({
    onChange: (filters) => handleFilter(filters),
  });

  useEffect(() => {
    if (notRender) return;

    handleFilter(filters.value);
  }, [JSON.stringify(postCategoriesTags), notRender]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const businessNewUpdateSection = useBusinessNewUpdateSection();

  if ((notRender && !renderHiddenSection) || !business) {
    return <></>;
  }

  return (
    <UpdateSomethingContainer
      title="Editar esta sección"
      onClick={() => {
        businessNewUpdateSection.open({
          sectionId: _id,
          onAfterSuccess: () => {
            business && onFetch({ routeName: business.routeName });
          },
        });
      }}
    >
      <div
        className={cn(
          'mt-10 p-0 lg:p-4',
          {
            'bg-gray-200 rounded-md': renderHiddenSection,
          },
          className,
        )}
      >
        {!hiddenName && (
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold">{name}</h2>
            {renderHiddenSection && <WarningViewOnlyAdmin />}
          </div>
        )}

        <PostsSectionSearch layout={layout} filters={filters} business={business} />

        <PostsSectionCards
          layout={layout}
          posts={hotUpdateTableData.data}
          business={business}
          onRefresh={() => filters.onRefresh()}
        />
      </div>
    </UpdateSomethingContainer>
  );
};
