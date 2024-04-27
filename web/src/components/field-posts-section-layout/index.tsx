import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';

import { PostsLayoutSectionType } from 'types/business';

export interface FieldPostsSectionLayoutProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {}

export const FieldPostsSectionLayout = (props: FieldPostsSectionLayoutProps) => {
  return (
    <FieldRadioGroup<{ value: PostsLayoutSectionType }>
      renderOption={({ checked, item }) => {
        return <FieldCheckbox noUseFormik value={checked} label={item.value} />;
      }}
      optionToValue={({ value }) => value}
      items={[
        {
          value: 'grid',
        },
        {
          value: 'oneRowSlider',
        },
      ]}
      containerClassName="flex items-center gap-4"
      {...props}
    />
  );
};
