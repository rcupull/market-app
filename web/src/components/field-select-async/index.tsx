import { useEffect, useState } from 'react';
import Select from 'react-select';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useDebouncer } from 'hooks/useDebouncer';
import { FetchOptions } from 'hooks/useFetch';
import { useFormikField } from 'hooks/useFormikField';

import { FetchResourceWithPagination } from 'types/api';
import { AnyRecord, StyleProps } from 'types/general';
import { getFlattenArray, isArray, isEqual } from 'utils/general';
export interface FieldSelectAsyncProps<
  Option extends AnyRecord = AnyRecord,
  Value = any,
  FetchArgs = AnyRecord,
> extends StyleProps,
    FormFieldWrapperProps {
  useCall: () => FetchResourceWithPagination<FetchArgs, Option>;
  searchToArgs: (search: string) => FetchArgs;
  renderOption: (option: Option) => React.ReactNode;
  optionToValue?: (option: Option) => Value;
  name: string;
  multi?: boolean;
  disabled?: boolean;
}

export const FieldSelectAsync = <Option extends AnyRecord = AnyRecord>({
  useCall,
  searchToArgs,
  className,
  renderOption,
  label,
  disabled,
  multi,
  optionToValue,
  ...props
}: Omit<FieldSelectAsyncProps<Option>, 'items'>) => {
  const { field, error } = useFormikField(props);
  const [state, setState] = useState<any>();
  const [open, setOpen] = useState(false);
  const [initialFetching, setInitialFetching] = useState(false);

  const { data, fetch, status } = useCall();
  const { value } = field;

  const debouncer = useDebouncer();

  const items = data || [];

  const itemToSelectOption = (
    item: Option | undefined,
  ): {
    value: any;
    label: React.ReactNode;
  } => {
    if (item === undefined) {
      return {
        value: undefined,
        label: 'Elemento desconocido',
      };
    }

    return {
      value: item,
      label: renderOption(item),
    };
  };

  useEffect(() => {
    let newState = value;

    if (isArray(value)) {
      const foundItems = value.map((v) =>
        items.find((item) => isEqual(optionToValue ? optionToValue(item) : item, v)),
      );
      newState = foundItems.map(itemToSelectOption);
    } else {
      const foundItem = items.find((item) => {
        return isEqual(optionToValue ? optionToValue(item) : item, value);
      });

      newState = foundItem ? itemToSelectOption(foundItem) : null;
    }

    setState(newState);
  }, [JSON.stringify([value, items])]);

  const handleChange = (newValue: any) => {
    if (isArray(newValue)) {
      const newSelectedOption = getFlattenArray(newValue);
      setState(newSelectedOption);

      field.onChange({
        target: {
          name: field.name,
          value: newValue.map((v) => (optionToValue ? optionToValue(v.value) : v.value)),
        },
      });
    } else {
      const newSelectedOption = newValue;
      setState(newSelectedOption);

      field.onChange({
        target: {
          name: field.name,
          value: optionToValue ? optionToValue(newValue.value) : newValue.value,
        },
      });
    }
  };

  const handleFetch = (search: string, options?: FetchOptions) => {
    fetch(searchToArgs(search), options);
  };

  const hasValue = isArray(value) ? value.length : value;

  const handleInitialFetch = () => {
    setInitialFetching(true);
    handleFetch('', {
      onAfterSuccess: () => {
        setTimeout(() => setInitialFetching(false), 100);
      },
    });
  };

  useEffect(() => {
    if (hasValue && data === null) {
      return handleInitialFetch();
    }

    if (open && data === null) {
      return handleInitialFetch();
    }
  }, [open, hasValue]);

  ////////////////////////////////////////////////////////////////////////////////
  const getPlaceholder = () => {
    if (initialFetching) {
      return 'Cargando...';
    }
    return 'Buscar';
  };

  const getDisabled = () => {
    if (initialFetching || disabled) {
      return true;
    }

    return false;
  };

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Select<{ value: Option }>
        isDisabled={getDisabled()}
        placeholder={getPlaceholder()}
        isLoading={status.isBusy}
        loadingMessage={() => <SpinnerEllipsis />}
        value={state}
        //
        menuIsOpen={open}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
        //
        noOptionsMessage={() => 'No hay opciones que mostrar'}
        styles={{
          input: (styles) => {
            return {
              ...styles,
              border: 'none',
              outline: 'none',
              ':focus-visible': {
                outline: 'none',
              },
              ':focus': {
                outline: 'none',
                boxShadow: 'none',
              },
            };
          },
        }}
        options={items.map(itemToSelectOption)}
        onInputChange={(inputValue, { action }) => {
          if (action === 'input-change') {
            debouncer(() => {
              handleFetch(inputValue);
            }, 500);
          }
        }}
        onChange={(newValue) => {
          if (!newValue) return;

          field.onBlur({
            target: {
              name: field,
            },
          });

          handleChange(newValue);
        }}
        //@ts-expect-error ignore
        isMulti={multi}
        hideSelectedOptions={false}
      />
    </FormFieldWrapper>
  );
};
