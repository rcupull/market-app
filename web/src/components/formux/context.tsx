import { createContext } from 'react';

import { FormContextState } from './types';

export const FormContext = createContext<FormContextState>({
  value: {},
  setValue: () => {},
  errors: {},
  setErrors: () => {},
  errorMode: 'touched',
  setErrorMode: () => {},
  isValid: true,
  touched: {},
  setTouched: () => {},
  resetForm: () => {},
  hasChange: false,
});
