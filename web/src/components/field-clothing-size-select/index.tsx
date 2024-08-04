import { RadioGroup } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { allClotingSize } from 'constants/posts';
import { PostClothingSize } from 'types/post';
import { addRow, cn, isNumber, removeRow } from 'utils/general';

type Value = PostClothingSize | Array<PostClothingSize>;

export interface FieldClothingSizeSelectProps extends FormFieldWrapperProps {
  sizesInStock?: Array<PostClothingSize>;
  multi?: boolean;
  name?: string;
}

export const FieldClothingSizeSelect = <V extends Value = Value>(
  props: FieldClothingSizeSelectProps
) => {
  const [state, setState] = useState<V>();

  const { label, className, sizesInStock: sizesInStockProp, multi } = props;
  const { field, error } = useFormField(props);
  const { value } = field;

  useEffect(() => {
    setState(value);
  }, [value]);

  const sizesInStock = sizesInStockProp || allClotingSize;

  const handleClick = (size: PostClothingSize) => {
    if (multi) {
      let newState = (state ? state : []) as Array<PostClothingSize>;

      const index = newState.findIndex((c) => c === size);

      if (isNumber(index) && index >= 0) {
        //remove color
        newState = removeRow(newState, index);
      } else {
        //add color
        newState = addRow(newState, size);
      }

      setState(newState as V);
      field.onChange({
        target: {
          name: field.name,
          value: newState
        }
      });
    } else {
      setState(size as V);
      field.onChange({
        target: {
          name: field.name,
          value: size
        }
      });
    }
  };

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <RadioGroup
        onBlur={() => {
          field.onBlur({
            target: {
              name: field.name
            }
          });
        }}
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {allClotingSize.map((size) => {
            const active = multi
              ? (state as Array<PostClothingSize>)?.find((c) => c === size)
              : state === size;

            const inStock = sizesInStock?.includes(size);

            return (
              <RadioGroup.Option
                key={size}
                value={size}
                disabled={!inStock}
                onClick={() => handleClick(size)}
                className={cn(
                  'cursor-not-allowed bg-gray-50 text-gray-200 group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                  {
                    'cursor-pointer bg-white text-gray-900 shadow-sm': inStock,
                    'ring-2 ring-indigo-500': active,
                    'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error
                  }
                )}
              >
                <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                {inStock ? (
                  <span
                    className={cn(
                      active ? 'border' : 'border-2',
                      active ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-md'
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                    >
                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                )}
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </FormFieldWrapper>
  );
};
