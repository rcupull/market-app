import { useState } from 'react';

import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { InputProps } from './types';


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
          <div onClick={() => setShowPassword(!showPassword)}>
            <IconButtonShowHide preventDefault hidden={!showPassword} />
          </div>
        ),
      })}
    </>
  );
};
