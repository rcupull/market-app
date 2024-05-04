import { Listbox, Transition } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { Fragment, useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { useFormikField } from 'hooks/useFormikField';

import SvgCheckSolid from 'icons/CheckSolid';
import SvgSortDownSolid from 'icons/SortDownSolid';
import { AnyRecord, StyleProps } from 'types/general';
import { cn, getFlattenArray, isArray, isEqualObj, removeRow } from 'utils/general';

export interface FieldSelectProps<Option extends AnyRecord = AnyRecord, Value = any>
  extends StyleProps,
    FormFieldWrapperProps {
  onChange?: (e: React.ChangeEvent) => void;
  value?: Value;
  items: Array<Option>;
  optionToValue?: (option: Option) => Value;
  renderOption: (option: Option) => React.ReactNode;
  renderValue: (option: Option) => React.ReactNode;
  name: string;
  multi?: boolean;
  disabled?: boolean;
}

export const FieldSelect = <Option extends AnyRecord = AnyRecord>(
  props: FieldSelectProps<Option>,
) => {
  const { items, renderOption, renderValue, label, className, optionToValue, multi, disabled } =
    props;

  const [state, setState] = useState<Option | Array<Option>>();

  const { field, error } = useFormikField(props);
  const { value = multi ? [] : null } = field;

  useEffect(() => {
    let newState = value;

    if (optionToValue) {
      if (isArray(value)) {
        newState = value.map((v) => items.find((item) => optionToValue(item) === v));
      } else {
        newState = items.find((item) => optionToValue(item) === value);
      }
    }

    setState(newState);
  }, [JSON.stringify([value])]);

  const handleChange = (newSelectedOptionT: any) => {
    if (isArray(newSelectedOptionT)) {
      const newSelectedOption = getFlattenArray(newSelectedOptionT);
      setState(newSelectedOption);

      field.onChange({
        target: {
          name: field.name,
          value: optionToValue ? newSelectedOption.map(optionToValue) : newSelectedOption,
        },
      });
    } else {
      const newSelectedOption = newSelectedOptionT;
      setState(newSelectedOption);

      field.onChange({
        target: {
          name: field.name,
          value: optionToValue ? optionToValue(newSelectedOption) : newSelectedOption,
        },
      });
    }
  };
  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Listbox disabled={disabled}>
        {({ open }) => {
          return (
            <div className={cn('relative')}>
              <Float
                as="div"
                className="relative"
                offset={4}
                floatingAs={Fragment}
                portal
                adaptiveWidth
                autoPlacement={{
                  allowedPlacements: ['bottom', 'top'],
                }}
              >
                <Listbox.Button
                  name={field.name}
                  onBlur={field.onBlur}
                  className={cn(
                    'relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6',
                    {
                      'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error,
                      '!cursor-not-allowed !bg-gray-200': disabled,
                    },
                  )}
                >
                  <div className="flex items-center h-6">
                    {state &&
                      (isArray(state)
                        ? state.map((option, index) => (
                            <Fragment key={index}>{renderValue(option)}</Fragment>
                          ))
                        : renderValue(state))}
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <SvgSortDownSolid className="h-5 w-5 fill-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {items.map((item, index) => {
                      const selected = isArray(state)
                        ? state.find((s) => isEqualObj(s, item))
                        : isEqualObj(state, item);

                      return (
                        <Listbox.Option
                          key={index}
                          className={({ active }) => {
                            return cn('text-gray-900 relative select-none cursor-pointer', {
                              ['bg-indigo-600 text-white']: active,
                            });
                          }}
                          onClick={(e) => {
                            if (isArray(state)) {
                              e.preventDefault(); // no close
                              handleChange(
                                selected
                                  ? removeRow(
                                      state,
                                      state.findIndex((i) => isEqualObj(i, item)),
                                    )
                                  : [...state, item],
                              );
                            } else {
                              handleChange(selected ? undefined : item);
                            }
                          }}
                          value={null}
                        >
                          {() => (
                            <div
                              className={cn('p-2', {
                                ['bg-gray-200']: selected,
                              })}
                            >
                              <div className="flex items-center ml-3 truncate">
                                {renderOption(item)}
                              </div>

                              {selected && (
                                <span
                                  className={cn(
                                    'bg-inherit absolute inset-y-0 right-0 flex items-center pr-4 fill-indigo-600',
                                  )}
                                >
                                  <SvgCheckSolid className="h-5 w-5" aria-hidden="true" />
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </Float>
            </div>
          );
        }}
      </Listbox>
    </FormFieldWrapper>
  );
};
