import { FormValidations } from './useGetFormErrors';

import { AnyRecord } from 'types/general';
import { Path } from 'types/paths';

export interface FormContextState<Value extends AnyRecord = AnyRecord> {
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
  //
  hasChange: boolean;
  //
  errorMode: FormErrorMode;
  setErrorMode: React.Dispatch<React.SetStateAction<FormErrorMode>>;
}

export type FormErrors<Value extends AnyRecord = AnyRecord> = Partial<Record<Path<Value>, string>>;
export type FormErrorMode = 'touched' | 'all';

export type FormTouched<Value extends AnyRecord = AnyRecord> = Partial<
  Record<Path<Value>, boolean>
>;

export interface FormuxProps<Value extends AnyRecord = AnyRecord> {
  children: (args: FormContextState<Value>) => React.ReactNode;
  value: Value;
  onChange?: (value: Value) => void;
  validate?: FormValidations<Value>;
}
