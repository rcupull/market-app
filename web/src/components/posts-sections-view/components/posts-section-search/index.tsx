import { PostCategoriesFilterButtons } from 'components/post-categories-filter-buttons';

import { UseFiltersReturn } from 'hooks/useFilters';

import { SearchFilter } from 'pages/@common/filters/search-filter';
import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface PostsSectionSearchProps extends StyleProps {
  filters: UseFiltersReturn;
  layout: PostsLayoutSection;
  business: Business;
}

export const PostsSectionSearch = ({
  layout,
  className,
  filters,
  business,
}: PostsSectionSearchProps) => {
  const { searchLayout, postCategoriesTags } = layout;

  const { postCategories } = business;

  const visiblesPostCategories = postCategories?.filter(({ hidden, tag }) => {
    if (hidden) return false;

    if (postCategoriesTags?.length && !postCategoriesTags.includes(tag)) return false;

    return true;
  });

  if (searchLayout === 'none') {
    return <></>;
  }

  const renderContent = (content: React.ReactNode) => {
    return <div className={cn('mt-8 w-full', className)}>{content}</div>;
  };

  if (searchLayout === 'left') {
    return renderContent(
      <div className="flex justify-start">
        <SearchFilter
          onChange={(search) => filters.onMergeFilters({ search })}
          value={filters.value.search}
        />
      </div>
    );
  }

  if (searchLayout === 'center') {
    return renderContent(
      <div className="flex justify-center">
        <SearchFilter
          onChange={(search) => filters.onMergeFilters({ search })}
          value={filters.value.search}
        />
      </div>
    );
  }

  if (searchLayout === 'right') {
    return renderContent(
      <div className="flex justify-end">
        <SearchFilter
          onChange={(search) => filters.onMergeFilters({ search })}
          value={filters.value.search}
        />
      </div>
    );
  }

  if (searchLayout === 'postCategories') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        debounceDelay={1000}
        type="wrapped"
      />
    );
  }

  if (searchLayout === 'postCategoriesScrollable') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        debounceDelay={1000}
        type="scrollable"
      />
    );
  }

  if (searchLayout === 'postCategoriesExcluded') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        debounceDelay={1000}
        excluding
        type="wrapped"
      />
    );
  }

  if (searchLayout === 'postCategoriesExcludedScrollable') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        debounceDelay={1000}
        excluding
        type="scrollable"
      />
    );
  }

  return <></>;
};
