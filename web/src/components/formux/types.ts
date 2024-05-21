import { FormValidations } from './useGetFormErrors';

import { AnyRecord } from 'types/general';

export interface ContextState<Value extends AnyRecord = AnyRecord> {
  value: Value;
  setValue: React.Dispatch<React.SetStateAction<Value>>;
  //
  errors: FormErrors<Value>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<Value>>>;

  //
  touched: FormTouched<Value>;
  setTouched: React.Dispatch<React.SetStateAction<FormTouched<Value>>>;
  //
  isValid: boolean;
  resetForm: () => void;
}

export type FormErrors<Value extends AnyRecord = AnyRecord> = Partial<Record<keyof Value, string>>;
export type FormTouched<Value extends AnyRecord = AnyRecord> = Partial<
  Record<keyof Value, boolean>
>;

export interface FormProps<Value extends AnyRecord = AnyRecord> {
  children: (args: ContextState<Value>) => React.ReactNode;
  value: Value;
  onChange?: (value: Value) => void;
  validate?: FormValidations<Value>;
}
