import { Button } from 'components/button';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';

import { PostCategory } from 'types/business';
import { AnyRecord } from 'types/general';
import { getPostCategoryTag } from 'utils/business';
import { cn } from 'utils/general';

export interface FieldBusinessCategoriesSelectProps<O>
  extends Omit<FieldRadioGroupProps<O>, 'renderOption' | 'optionToValue' | 'items'> {}

const defaultCategoriesLabels: Array<{ label: string }> = [
  {
    label: 'Recientes'
  },
  {
    label: 'Ofertas'
  },
  {
    label: 'Rebajas'
  },
  {
    label: 'Recomendados'
  },
  {
    label: 'Ventas calientes'
  },
  {
    label: 'Para hombres'
  },
  {
    label: 'Para mujeres'
  },
  {
    label: 'Para niños'
  },
  {
    label: 'En tendencia'
  },
  {
    label: 'Tallas grandes'
  }
];

export const FieldBusinessCategoriesSelect = (
  props: FieldBusinessCategoriesSelectProps<AnyRecord>
) => {
  return (
    <FieldRadioGroup<{ value: PostCategory }>
      renderOption={({ checked, item }) => {
        const { value } = item;
        return (
          <Button
            as="div"
            className={cn('w-fit cursor-pointer', {
              '!bg-gray-300': checked
            })}
            variant="outlined"
            label={value.label}
          />
        );
      }}
      multi
      optionToValue={({ value }) => value}
      items={defaultCategoriesLabels.map(({ label }) => ({
        value: {
          label,
          tag: getPostCategoryTag(label),
          hidden: false
        }
      }))}
      containerClassName="flex flex-wrap gap-2 justify-between"
      {...props}
    />
  );
};
