import { useState } from 'react';

import { FieldSelect } from 'components/field-select';

import { FieldInput } from '../field-input';
import { Formux } from '.';

import { ShoppingState } from 'types/shopping';

export default {
  component: Formux,
};

export const Default = (): JSX.Element => {
  const [state, setState] = useState({ name: '' });

  return (
    <>
      <Formux onChange={setState} value={state}>
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
      </Formux>
      <Formux onChange={setState} value={state}>
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
      </Formux>
    </>
  );
};
