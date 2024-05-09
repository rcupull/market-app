import { forwardRef } from 'react';

import { PasswordWrapper } from './PasswordWrapper';
import { InputProps } from './types';

import { cn } from 'utils/general';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type } = props;

  const renderInput = (props: InputProps) => {
    const { className, endElement, ...omittedProps } = props;

    return (
      <div className={cn('relative', className)}>
        <input
          ref={ref}
          className={cn(
            'block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed',
            {
              '!pr-10': endElement,
            },
          )}
          {...omittedProps}
        />
        {endElement && (
          <div className="absolute h-full top-0 right-0 flex items-center">{endElement}</div>
        )}
      </div>
    );
  };

  if (type === 'password') {
    return (
      <PasswordWrapper>
        {({ endElement, type }) => renderInput({ ...props, endElement, type })}
      </PasswordWrapper>
    );
  }

  return renderInput(props);
});
