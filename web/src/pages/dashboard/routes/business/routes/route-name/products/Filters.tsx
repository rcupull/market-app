import { useEffect, useState } from 'react';

import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FiltersContainer } from 'components/filters-container';
import { PostCategoriesFilterButtons } from 'components/post-categories-filter-buttons';
import { RadioGroup } from 'components/radio-group';

import { GetAllPostsQuery } from 'types/api';
import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';

type FilterType = 'categories' | 'section';

export interface FiltersProps extends StyleProps {
  business: Business | null;
  onChange?: (filters: GetAllPostsQuery) => void;
  value?: GetAllPostsQuery;
}

export const Filters = ({ business, onChange, value, className }: FiltersProps) => {
  const { postCategoriesTags } = value || {};
  const { postCategories, layouts } = business || {};

  const [filterType, setFilterType] = useState<FilterType>('categories');

  const sections = layouts?.posts?.sections || [];
  const [selectedSection, setSelectedSection] = useState();

  useEffect(() => {
    if (filterType === 'categories') {
      setSelectedSection(undefined);
    }
  }, [filterType]);

  return (
    <FiltersContainer
      onReset={() => {
        onChange?.({
          page: 1,
          postCategoriesTags: undefined,
          postCategoriesMethod: undefined,
        });

        setFilterType('categories');
      }}
      className={className}
    >
      <div className="w-full">
        <div>
          <RadioGroup<{ label: string; value: FilterType }>
            onChange={(newFilterType) => {
              onChange?.({
                page: 1,
                postCategoriesTags: undefined,
                postCategoriesMethod: undefined,
              });
              setFilterType(newFilterType);
            }}
            value={filterType}
            renderOption={({ checked, item }) => (
              <FieldCheckbox noUseFormik value={checked} label={item.label} />
            )}
            optionToValue={({ value }) => value}
            items={[
              {
                label: 'Filtrar por categorías',
                value: 'categories',
              },
              {
                label: 'Filtrar por secciones',
                value: 'section',
              },
            ]}
            className="flex items-center gap-2 mb-5"
          />
        </div>
        {filterType === 'categories' && (
          <PostCategoriesFilterButtons
            postCategories={postCategories}
            onChange={(postCategoriesTags) =>
              onChange?.({ page: 1, postCategoriesTags, postCategoriesMethod: 'every' })
            }
            value={postCategoriesTags}
            type="wrapped"
            buttonType="tab"
          />
        )}

        {filterType === 'section' && (
          <RadioGroup<PostsLayoutSection>
            value={selectedSection}
            onChange={(section) => {
              setSelectedSection(section);

              onChange?.({
                page: 1,
                postCategoriesTags: section.postCategoriesTags,
                postCategoriesMethod: 'some',
              });
            }}
            items={sections}
            renderOption={({ checked, item }) => (
              <Button label={item.name} variant={checked ? 'sublined' : 'transparent'} />
            )}
            optionToValue={(option) => option}
            className="flex items-center gap-2"
          />
        )}
      </div>
    </FiltersContainer>
  );
};
