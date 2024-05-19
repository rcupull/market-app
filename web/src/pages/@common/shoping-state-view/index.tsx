import { FieldSelect } from 'components/field-select';
import { Formik } from 'components/formik';

import { useShoppingChangeState } from 'features/api/shopping/useShoppingChangeState';

import { Shopping, ShoppingState } from 'types/shopping';
import { getShoppingStateLabel } from 'utils/shopping';

export interface ShoppingStateViewProps {
  shopping: Shopping;
  onAfterSuccess?: () => void;
}
export const ShoppingStateView = ({ shopping, onAfterSuccess }: ShoppingStateViewProps) => {
  const { state, _id } = shopping;

  const { shoppingChangeState } = useShoppingChangeState();

  return (
    <Formik<{ state: ShoppingState }>
      initialValues={{ state }}
      onChange={({ state }) => {
        shoppingChangeState.fetch(
          { state, shoppingId: _id },
          {
            onAfterSuccess,
          },
        );
      }}
    >
      {() => {
        return (
          <form className="w-40">
            <FieldSelect<{ value: ShoppingState; label: string }>
              name="state"
              optionToValue={({ value }) => value}
              renderOption={({ label }) => label}
              renderValue={({ label }) => label}
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
  );
  //
  return <>{getShoppingStateLabel(state)}</>;
};
