import { useEffect, useMemo } from 'react';

import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { useFormField } from 'components/formux/useFormField';

import { useGeneralBusinessCategories } from 'features/api/general/useGeneralBusinessCategories';

import { AnyRecord } from 'types/general';
import { cn } from 'utils/general';

export interface FieldBusinessCategoriesSelectProps<O, V>
  extends Omit<FieldRadioGroupProps<O, V>, 'renderOption' | 'optionToValue' | 'items'> {}

interface Option {
  value: string;
  level: number;
}

export const FieldBusinessCategoriesSelect = (
  props: FieldBusinessCategoriesSelectProps<AnyRecord, Array<string>>,
) => {
  const { generalBusinessCategories } = useGeneralBusinessCategories();

  const { field } = useFormField(props);
  useEffect(() => {
    generalBusinessCategories.fetch();
  }, []);

  const { businessCategoryLabels, businessCategoryTree } = generalBusinessCategories.data || {};

  const getItems = (args: {
    initialItems: Array<Option>;
    parentPath: string;
    tree: AnyRecord;
    level: number;
  }): Array<Option> => {
    const { initialItems, parentPath, tree, level } = args;
    const entries = Object.entries(tree);

    entries.forEach(([key, value]) => {
      const newParentPath = parentPath ? `${parentPath}.${key}` : key;

      initialItems.push({
        value: newParentPath,
        level,
      });

      if (value instanceof Object) {
        getItems({
          initialItems,
          parentPath: newParentPath,
          tree: value,
          level: level + 1,
        });
      }
    });

    return initialItems;
  };

  const items = useMemo(() => {
    if (!businessCategoryTree) {
      return [];
    }

    return getItems({
      initialItems: [],
      parentPath: '',
      tree: businessCategoryTree,
      level: 0,
    });
  }, [JSON.stringify(businessCategoryTree)]);

  const maxLevel = Math.max(...items.map(({ level }) => level));
  ////////////////////////////////////////////////////////////////////////////////
  const addAllChildrenFrom = (path: string) => {
    const allPaths = items.map(({ value }) => value);
    const newValue = [...field.value, ...allPaths.filter((p) => p.startsWith(path))];
    field.onChange({
      target: {
        name: field.name,
        value: newValue,
      },
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  const removeAllChildrenFrom = (path: string) => {
    const newvalue = field.value.filter((p) => !p.startsWith(path));

    field.onChange({
      target: {
        name: field.name,
        value: newvalue,
      },
    });
  };

  return (
    <FieldRadioGroup<Option>
      isBusy={generalBusinessCategories.status.isBusy}
      onOptionClicked={({ value, level }, { selected }) => {
        if (level < maxLevel) {
          (selected ? addAllChildrenFrom : removeAllChildrenFrom)(value);
        }
      }}
      renderOption={({ checked, item }) => {
        const { value } = item;
        return (
          <FieldCheckbox noUseFormik value={checked} label={businessCategoryLabels?.[value]} />
        );
      }}
      getOptionCutomStyles={({ level }) => {
        return cn({
          'pl-4': level > 0,
          'col-start-1 col-span-full py-1 my-4 border-y-2 border-gray-300': level === 0,
        });
      }}
      multi
      optionToValue={({ value }) => value}
      items={items}
      containerClassName="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4"
      {...props}
    />
  );
};
