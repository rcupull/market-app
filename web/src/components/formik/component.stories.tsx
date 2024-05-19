import { useState } from 'react';

import { FieldSelect } from 'components/field-select';

import { FieldInput } from '../field-input';
import { Formik } from '.';

import { ShoppingState } from 'types/shopping';

export default {
  component: Formik,
};

export const Default = (): JSX.Element => {
  const [state, setState] = useState({ name: '' });

  return (
    <>
      <Formik onChange={setState} initialValues={state}>
        {() => {
          return (
            <form>
              <FieldInput name="name" label="Nombre" />

              <FieldSelect<{ value: ShoppingState; label: string }>
                name="state"
                optionToValue={({ value }) => value}
                renderOption={({ label }) => label}
                renderValue={({ label }) => label}
                label="State"
                className="mt-6"
                items={[
                  {
                    value: 'DELIVERED',
                    label: 'Entregado',
                  },
                  {
                    value: 'CANCELED',
                    label: 'Cancelado',
                  },
                  {
                    value: 'REQUESTED',
                    label: 'Solicitado',
                  },
                ]}
              />
            </form>
          );
        }}
      </Formik>
      <Formik onChange={setState} initialValues={state}>
        {() => {
          return (
            <form>
              <FieldInput name="name" label="Nombre" />

              <FieldSelect<{ value: ShoppingState; label: string }>
                name="state"
                optionToValue={({ value }) => value}
                renderOption={({ label }) => label}
                renderValue={({ label }) => label}
                label="State"
                className="mt-6"
                items={[
                  {
                    value: 'DELIVERED',
                    label: 'Entregado',
                  },
                  {
                    value: 'CANCELED',
                    label: 'Cancelado',
                  },
                  {
                    value: 'REQUESTED',
                    label: 'Solicitado',
                  },
                ]}
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
};
