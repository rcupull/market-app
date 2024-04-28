import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';

import { PostsLayoutSectionType } from 'types/business';

export interface FieldPostsSectionLayoutProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {}

export const FieldPostsSectionLayout = (props: FieldPostsSectionLayoutProps) => {
  return (
    <FieldRadioGroup<{ value: PostsLayoutSectionType; label: string }>
      renderOption={({ checked, item }) => {
        return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
      }}
      optionToValue={({ value }) => value}
      items={[
        {
          value: 'grid',
          label: 'Rejilla',
        },
        {
          value: 'oneRowSlider',
          label: 'Fila deslizante',
        },
      ]}
      containerClassName="flex items-center gap-4"
      {...props}
    />
  );
};
