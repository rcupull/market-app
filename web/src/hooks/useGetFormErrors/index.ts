import { useRef } from 'react';

import { AnyRecord } from 'types/general';
import { getFlattenJson, isNullOrUndefinedOrEmptyString } from 'utils/general';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationsCallback = {
  required: (value: any): boolean => {
    if (value instanceof Array) {
      return value.length > 0;
    }
    return !isNullOrUndefinedOrEmptyString(value);
  },
  email: (value: string): boolean => {
    return emailRegex.test(value);
  },
  equal: (value1: any, value2: any): boolean => {
    return value1 === value2;
  },
};

interface Validation<V extends AnyRecord, F extends keyof V = keyof V> {
  field: F;
  type: 'required' | 'email' | 'equal' | 'custom';
  equalField?: F;
  customCb?: (fieldValue: any) => Promise<boolean> | boolean;
  message?: string;
}

export type GetFormErrors<V extends AnyRecord, F extends keyof V = keyof V> = (
  value: V,
  validations: Array<Validation<V, F>>,
) => Promise<Partial<Record<F, string>>>;

export const useGetFormErrors = <V extends AnyRecord, F extends keyof V = keyof V>(): GetFormErrors<
  V,
  F
> => {
  const refValues = useRef<V>();
  const refErrors = useRef<Partial<Record<F, string>>>();

  const getFormErrors: GetFormErrors<V, F> = async (value, validations) => {
    const errors: Partial<Record<F, string>> = {};

    const getValidationPromise = async (validation: Validation<V, F>): Promise<void> => {
      const { field, type, message, equalField, customCb } = validation;

      if (errors[field]) return; //return if has error
      if (refValues.current?.[field] === value[field]) {
        errors[field] = refErrors.current?.[field]; // return de same error if has not change the value
        return;
      }

      const fieldValue = value[field];

      if (type === 'required' && !validationsCallback.required(fieldValue)) {
        errors[field] = message || `Campo requerido.`;
      }

      if (type === 'email' && !validationsCallback.email(fieldValue)) {
        errors[field] = message || `Email inválido.`;
      }

      if (type === 'custom') {
        if (!customCb) {
          return console.log('customCb not found');
        }

        if (!(await customCb(fieldValue))) {
          errors[field] = message || `Campo inválido`;
        }
      }

      if (type === 'equal') {
        if (!equalField) {
          return console.log('equalField not found');
        }

        if (!validationsCallback.equal(fieldValue, value[equalField])) {
          errors[field] = message || `El campo debe ser ${equalField.toString()}.`;
        }
      }
    };

    const validationPromises = validations.map(getValidationPromise);

    await Promise.all(validationPromises);

    refValues.current = value;
    refErrors.current = errors;

    return getFlattenJson(errors);
  };

  return getFormErrors;
};
