import { ReactNode } from 'react';

import { Accordion } from 'components/accordion';
import { ButtonDescription } from 'components/button-decription';

import { Nullable, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FormFieldWrapperProps extends StyleProps {
  label?: React.ReactNode;
  labelPosition?: 'top' | 'right';
  description?: React.ReactNode;
  collapsable?: boolean;
  collapsableHeader?: ReactNode;
}

export const FormFieldWrapper = ({
  className,
  label,
  error,
  children,
  labelPosition = 'top',
  description,
  collapsable,
  collapsableHeader = 'Abrir'
}: FormFieldWrapperProps & { children: React.ReactNode; error?: Nullable<string> }) => {
  return (
    <div data-id="FormFieldWrapper" className={cn(className)}>
      <div
        className={cn({
          'flex flex-row-reverse items-center': labelPosition === 'right',
        })}
      >
        {(label || description) && (
          <div
            className={cn('flex items-center h-7', {
              'mb-2': labelPosition === 'top',
              'ml-2': labelPosition === 'right',
            })}
          >
            {label && (
              <label
                className={cn('block text-sm font-semibold leading-6 text-gray-900  w-fit', {
                  'text-red-500': !!error,
                })}
              >
                {label}
              </label>
            )}

            {description && <ButtonDescription description={description} />}
          </div>
        )}

        {collapsable ? <Accordion header={collapsableHeader}>{children}</Accordion> : children}
      </div>

      <span className="text-red-500 text-xs">{error}</span>
    </div>
  );
};
