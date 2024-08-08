import { cn } from './general';

import SvgCheckCircleSolid from 'icons/CheckCircleSolid';
import SvgTimesCircle from 'icons/TimesCircle';

export const isPasswordValidLength = (password: string): boolean => {
  const regexp = new RegExp('^(?=.{8,})');
  return regexp.test(password);
};

export const isPasswordValidNumber = (password: string): boolean => {
  //Longitud mínima, que debe tener un mínimo de 8 caracteres y menos de 99 caracteres:
  const regexp = new RegExp('^(?=.*[0-9])');
  return regexp.test(password);
};
export const isPasswordValidSpecialChar = (password: string): boolean => {
  //Un carácter especial obligatorio de este conjunto:
  const regexp = new RegExp('^(?=.*[.!@#$%^&*/])');
  return regexp.test(password);
};
export const isPasswordValidUppperCase = (password: string): boolean => {
  //Requiere letras mayúsculas obligatorias
  const regexp = new RegExp('^(?=.*[A-Z])');
  return regexp.test(password);
};
export const isPasswordValidLowerCase = (password: string): boolean => {
  //Requiere letras minúsculas obligatorias
  const regexp = new RegExp('^(?=.*[a-z])');
  return regexp.test(password);
};

export const getStrongPasswordTracking = (
  value: string
): {
  valid: boolean;
  trackingNode: React.ReactNode;
} => {
  const validations = {
    length: isPasswordValidLength(value),
    number: isPasswordValidNumber(value),
    symbol: isPasswordValidSpecialChar(value),
    uppercase: isPasswordValidUppperCase(value),
    lowercase: isPasswordValidLowerCase(value)
  };

  const renderTraking = (label: string, valid: boolean) => {
    return (
      <div
        className={cn('flex items-center text-sm my-0.5', {
          'text-green-600 fill-green-600': valid,
          'text-red-600 fill-red-600': !valid
        })}
      >
        {valid ? <SvgCheckCircleSolid className="size-4" /> : <SvgTimesCircle className="size-4" />}
        <span className="ml-2">{label}</span>
      </div>
    );
  };

  return {
    valid: Object.values(validations).every(Boolean),
    trackingNode: (
      <div className="flex flex-col">
        {renderTraking('Longitud mínima de 8 caracteres.', !!validations.length)}
        {renderTraking('Requiere un número como mínimo.', !!validations.number)}
        {renderTraking('Requiere un carácter especial.', !!validations.symbol)}
        {renderTraking('Requiere una letra mayúscula como mínimo.', !!validations.uppercase)}
        {renderTraking('Requiere una letra minúsculas como mínimo.', !!validations.lowercase)}
      </div>
    )
  };
};
