import { FormValidations } from './useGetFormErrors';

import { AnyRecord } from 'types/general';

export interface ContextState<Value extends AnyRecord = AnyRecord> {
  value: Value;
  setValue: (value: Value) => void;
  //
  errors: FormErrors<Value>;
  setErrors: (errors: FormErrors<Value>) => void;
  //
  isValid: boolean;
}

export type FormErrors<Value extends AnyRecord = AnyRecord> = Partial<Record<keyof Value, string>>;

export interface FormProps<Value extends AnyRecord = AnyRecord> {
  children: (args: ContextState<Value>) => React.ReactNode;
  value: Value;
  onChange?: (value: Value) => void;
  validate?: FormValidations<Value>;
}
