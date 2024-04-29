import { useEffect } from 'react';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useHotUpdateTableData } from 'hooks/useHotUpdateTableData';

import { PostsSectionCards } from '../posts-section-cards';
import { PostsSectionSearch } from '../posts-section-search';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { GetAllPostsQuery } from 'types/api';
import { PostsLayoutSection, PostsLayoutSectionVisibility } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { cn } from 'utils/general';

export interface PostsSectionProps extends StyleProps {
  index: number;
  routeName: string;
  layout: PostsLayoutSection;
  visibility: PostsLayoutSectionVisibility;
}

export const PostsSection = ({
  routeName,
  layout,
  className,
  index,
  visibility,
}: PostsSectionProps) => {
  const { business, onFetch } = useBusiness();
  const { name, hiddenName, postCategoriesTags, _id, showIn } = layout;

  const { getAllPosts } = useGetAllPosts();
  const { owner } = useBusiness();

  const hidden = !showIn?.includes(visibility);
  const notRender = hidden && !owner;
  const renderHiddenSection = hidden && owner;

  const hotUpdateTableData = useHotUpdateTableData<Post, { postId: string; stockAmount: number }>({
    data: getAllPosts.data,
    updateKey: `updatePostAmount`,
    findCB: (rowData, { postId }) => rowData._id === postId,
    changeCB: (rowData, { stockAmount }) => ({ ...rowData, stockAmount }),
  });

  const handleFilter = (filters: GetAllPostsQuery) => {
    const hasCategoriesTags = filters.postCategoriesTags?.length;

    getAllPosts.fetch({
      routeNames: [routeName],
      postCategoriesTags,
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
  }, [JSON.stringify(postCategoriesTags)]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const callAfarResourcesRefreshBusiness = `post_section_${index}_business_onRefresh`;
  useCallFromAfar(callAfarResourcesRefreshBusiness, () => onFetch({ routeName }));

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const businessNewUpdateSection = useBusinessNewUpdateSection();

  if (notRender || !business) {
    return <></>;
  }

  return (
    <UpdateSomethingContainer
      title="Editar este grupo de publicaciones"
      onClick={() => {
        businessNewUpdateSection.open({
          sectionId: _id,
          onAfterSuccess: () => business && onFetch({ routeName: business.routeName }),
        });
      }}
    >
      <div
        className={cn(
          'mt-10 p-4',
          {
            'bg-gray-200 rounded-md': renderHiddenSection,
          },
          className,
        )}
      >
        {!hiddenName && (
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold">{name}</h2>
            {renderHiddenSection && (
              <span className="text-sm sm:text-lg ml-3 text-yellow-600">
                (Solo visible para el administrador del negocio)
              </span>
            )}
          </div>
        )}

        <PostsSectionSearch layout={layout} filters={filters} business={business} />

        <PostsSectionCards
          layout={layout}
          posts={hotUpdateTableData.data}
          business={business}
          callAfarResources={[callAfarResourcesRefreshBusiness]}
        />
      </div>
    </UpdateSomethingContainer>
  );
};
