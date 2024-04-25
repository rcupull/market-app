import { FieldSelect, FieldSelectProps } from 'components/field-select';

import { PostsLayoutSectionType } from 'types/business';

export interface FieldPostsSectionLayoutProps
  extends Omit<FieldSelectProps, 'items' | 'renderOption' | 'renderValue' | 'optionToValue'> {}

export const FieldPostsSectionLayout = (props: FieldPostsSectionLayoutProps) => {
  return (
    <FieldSelect<{ [k in string]: PostsLayoutSectionType }>
      renderOption={({ value }) => value}
      renderValue={({ value }) => value}
      optionToValue={({ value }) => value}
      items={[
        {
          value: 'grid',
        },
        {
          value: 'oneRowSlider',
        },
      ]}
      {...props}
    />
  );
};
