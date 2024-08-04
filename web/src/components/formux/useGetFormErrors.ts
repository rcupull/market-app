import { useRef } from 'react';

import { FormErrors } from './types';

import { AnyRecord, Nullable } from 'types/general';
import { Path } from 'types/paths';
import { compact, get, getFlattenJson, isNullOrUndefinedOrEmptyString } from 'utils/general';

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
  }
};

export interface Validation<V extends AnyRecord, F extends Path<V> = Path<V>> {
  field: F;
  type: 'required' | 'email' | 'equal' | 'custom';
  equalField?: F;
  customCb?: (fieldValue: any) => Promise<boolean> | boolean;
  message?: string;
}

export type FormValidations<V extends AnyRecord, F extends Path<V> = Path<V>> = Array<
  Nullable<Validation<V, F>>
>;

export type FormValidationsGetter<V extends AnyRecord, F extends Path<V> = Path<V>> = (arg: {
  state: V;
}) => Array<Nullable<Validation<V, F>>>;

export type GetFormErrors<V extends AnyRecord, F extends Path<V> = Path<V>> = (
  value: V,
  validations: FormValidations<V, F>
) => Promise<Partial<Record<F, string>>>;

export const useGetFormErrors = <V extends AnyRecord, F extends Path<V> = Path<V>>(): GetFormErrors<
  V,
  F
> => {
  const refValues = useRef<V>();
  const refErrors = useRef<FormErrors<V>>();

  const getFormErrors: GetFormErrors<V, F> = async (value, validations) => {
    const errors: FormErrors<V> = {};

    const getValidationPromise = async (validation: Validation<V, F>): Promise<void> => {
      const { field, type, message, equalField, customCb } = validation;

      const getErrorMessage = () => {
        if (message) return message;

        switch (type) {
          case 'required':
            return 'Campo requerido.';
          case 'email':
            return 'Email inválido.';
          case 'equal':
            if (!equalField) return '<unknown error>';
            return `El campo debe ser ${equalField.toString()}.`;
          case 'custom':
            return `Campo inválido.`;
          default: {
            return '<unknown error>';
          }
        }
      };

      const errorMessage = getErrorMessage();

      if (errors[field]) return; //return if has error

      const fieldValue = get(value, field);

      const hasFieldChanges = refValues.current && get(refValues.current, field) === fieldValue;
      const hasSameErrorMessage = refErrors.current && refErrors.current[field] === errorMessage;

      if (type !== 'equal' && hasFieldChanges && hasSameErrorMessage) {
        /**
         * // return de same error if has not change the value
         * if type = 'equal' the validation depends of two values. It is necessary ignore this rule
         */
        errors[field] = refErrors.current?.[field];
        return;
      }

      if (type === 'required' && !validationsCallback.required(fieldValue)) {
        errors[field] = errorMessage;
      }

      if (type === 'email' && !validationsCallback.email(fieldValue)) {
        errors[field] = errorMessage;
      }

      if (type === 'custom') {
        if (!customCb) {
          return console.log('customCb not found');
        }

        if (!(await customCb(fieldValue))) {
          errors[field] = errorMessage;
        }
      }

      if (type === 'equal') {
        if (!equalField) {
          return console.log('equalField not found');
        }

        if (!validationsCallback.equal(fieldValue, get(value, equalField))) {
          errors[field] = errorMessage;
        }
      }
    };

    const validationPromises = compact(validations).map(getValidationPromise);

    await Promise.all(validationPromises);

    refValues.current = value;
    refErrors.current = errors;

    return getFlattenJson(errors);
  };

  return getFormErrors;
};
