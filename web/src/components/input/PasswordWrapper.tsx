import { useState } from 'react';

import { InputProps } from './types';

import SvgEye from 'icons/Eye';

export interface PasswordWrapperProps {
  children: (args: { endElement: React.ReactNode; type: InputProps['type'] }) => React.ReactNode;
}
export const PasswordWrapper = ({ children }: PasswordWrapperProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {children({
        type: showPassword ? 'text' : 'password',
        endElement: (
          <div
            onMouseEnter={() => setShowPassword(true)}
            onMouseLeave={() => setShowPassword(false)}
          >
            <SvgEye className="size-6 fill-gray-500 cursor-pointer mx-2" />
          </div>
        )
      })}
    </>
  );
};
