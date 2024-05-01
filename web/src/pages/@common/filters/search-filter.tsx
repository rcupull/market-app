import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { usePortal } from 'hooks/usePortal';

import { Formik } from 'formik';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SearchFilterProps extends StyleProps {
  isBusy?: boolean;
  onChange?: (search: string | undefined) => void;
  value?: string;
  hideButtons?: boolean;
  placeholder?: string;
}

export const SearchFilter = ({
  isBusy,
  onChange,
  className,
  value,
  hideButtons,
  placeholder,
}: SearchFilterProps) => {
  const submitBtnPortal = usePortal();
  const clearBtnPortal = usePortal();

  if (hideButtons) {
    return (
      <div className={cn(className)}>
        <Formik
          enableReinitialize
          initialValues={{
            search: value || '',
          }}
          onSubmit={() => {}}
        >
          {({ values }) => {
            return (
              <form className="flex w-full">
                <FieldInput
                  name="search"
                  placeholder={placeholder}
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onChange?.(values.search);
                    }
                  }}
                />
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center w-full sm:w-fit ', className)}>
      <Formik
        enableReinitialize
        initialValues={{
          search: value || '',
        }}
        onSubmit={() => {}}
      >
        {({ values, handleReset }) => {
          return (
            <form className="flex w-full">
              <FieldInput
                name="search"
                className="w-full sm:w-64 mr-auto"
                placeholder={placeholder}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onChange?.(values.search);
                  }
                }}
              />

              {submitBtnPortal.getPortal(
                <div
                  className="ml-2"
                  onClick={() => {
                    onChange?.(values.search);
                  }}
                >
                  <Button
                    label="Buscar"
                    isBusy={isBusy}
                    value={value}
                    variant="primary"
                    className="hidden sm:block"
                  />
                  <MagnifyingGlassIcon className="sm:hidden h-8 w-8 rounded-full p-1 text-indigo-500 cursor-pointer hover:bg-gray-100" />
                </div>,
              )}

              {clearBtnPortal.getPortal(
                <div
                  className="ml-2"
                  onClick={() => {
                    handleReset();
                    onChange?.(undefined);
                  }}
                >
                  <Button label="Limpiar" variant="outlined" className="hidden sm:block" />
                  <XCircleIcon className="sm:hidden h-8 w-8 rounded-full p-1 text-red-500 cursor-pointer hover:bg-gray-100" />
                </div>,
              )}
            </form>
          );
        }}
      </Formik>

      <div ref={submitBtnPortal.ref} />

      <div ref={clearBtnPortal.ref} />
    </div>
  );
};
