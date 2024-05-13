import {  useState } from 'react';

import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';

import { GetAllPostsQuery } from 'types/api';
import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';

export interface FiltersProps extends StyleProps {
  business: Business | null;
  onChange?: (filters: GetAllPostsQuery) => void;
  value?: GetAllPostsQuery;
}

export const Filters = ({ business, onChange, className }: FiltersProps) => {
  const {  layouts } = business || {};


  const sections = (layouts?.posts?.sections || []).filter(({postType})=> postType === 'link');
  const [selectedSection, setSelectedSection] = useState();

  return (
    <div className={className}>
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
    </div>
  );
};
