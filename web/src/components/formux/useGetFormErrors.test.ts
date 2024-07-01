import { renderHook } from '@testing-library/react';

import { useGetFormErrors, Validation } from './useGetFormErrors';

import { AnyRecord } from 'types/general';

describe('useGetFormErrors', () => {
  const args: Array<[AnyRecord, AnyRecord, Validation<AnyRecord>]> = [
    [
      // simple valid required
      {},
      {
        value: 'test',
      },
      {
        field: 'value',
        type: 'required',
      },
    ],
    [
      // deep valid required
      {},
      {
        value: { field: 'test' },
      },
      {
        field: 'value.field',
        type: 'required',
      },
    ],
    [
      // simple not valid required
      { value: 'Campo requerido.' },
      {
        value: '',
      },
      {
        field: 'value',
        type: 'required',
      },
    ],
    [
      // deep not valid required
      { 'value.field': 'Campo requerido.' },
      {
        value: { field: '' },
      },
      {
        field: 'value.field',
        type: 'required',
      },
    ],
    [
      // simple valid email
      {},
      {
        value: 'asdasd@asdd.com',
      },
      {
        field: 'value',
        type: 'email',
      },
    ],
    [
      // simple not valid email
      { value: 'Email inválido.' },
      {
        value: 'wrong email',
      },
      {
        field: 'value',
        type: 'email',
      },
    ],
    [
      // deep valid email
      {},
      {
        value: {
          email: 'asdasd@asdd.com',
        },
      },
      {
        field: 'value.email',
        type: 'email',
      },
    ],
    [
      // deep not valid email
      { 'value.email': 'Email inválido.' },
      {
        value: {
          email: 'wrong email',
        },
      },
      {
        field: 'value.email',
        type: 'email',
      },
    ],
  ];

  it.each(args)(
    'should return %p when value = %p and validations = %p',
    async (expected, value, validation) => {
      const { result } = renderHook(() => useGetFormErrors(), {});

      const errors = await result.current(value, [validation]);
      expect(errors).toEqual(expected);
    }
  );
});
