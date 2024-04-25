import { Nullable, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FormFieldWrapperProps extends StyleProps {
  label?: React.ReactNode;
  labelPosition?: 'top' | 'right';
}

export const FormFieldWrapper = ({
  className,
  label,
  error,
  children,
  labelPosition = 'top',
}: FormFieldWrapperProps & { children: React.ReactNode; error?: Nullable<string> }) => {
  return (
    <div data-id="FormFieldWrapper" className={cn(className)}>
      <div
        className={cn({
          'flex flex-row-reverse items-center': labelPosition === 'right',
        })}
      >
        {label && (
          <label
            className={cn('block text-sm font-semibold leading-6 text-gray-900  w-fit', {
              'text-red-500': !!error,
              'mb-2': labelPosition === 'top',
              'ml-2': labelPosition === 'right',
            })}
          >
            {label}
          </label>
        )}
        {children}
      </div>

      <span className="text-red-500 text-xs">{error}</span>
    </div>
  );
};
