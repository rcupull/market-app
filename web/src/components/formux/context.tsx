import { createContext } from 'react';

import { ContextState } from './types';

export const FormContext = createContext<ContextState>({
  value: {},
  setValue: () => {},
  errors: {},
  setErrors: () => {},
  isValid: true,
  touched: {},
  setTouched: () => {},
  resetForm: () => {},
});
