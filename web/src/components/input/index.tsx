import { forwardRef } from 'react';

import { cn } from 'utils/general';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...omittedProps } = props;

  return (
    <input
      ref={ref}
      className={cn(
        'block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed',
        className,
      )}
      {...omittedProps}
    />
  );
});
