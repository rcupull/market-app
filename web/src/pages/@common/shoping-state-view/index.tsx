import { FieldSelect } from 'components/field-select';
import { Formux } from 'components/formux';

import { useShoppingChangeState } from 'features/api/shopping/useShoppingChangeState';

import { Shopping, ShoppingState } from 'types/shopping';
import { cn } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

interface State {
  state: ShoppingState;
}
export interface ShoppingStateViewProps {
  shopping: Shopping;
  onAfterSuccess?: () => void;
}
export const ShoppingStateView = ({ shopping, onAfterSuccess }: ShoppingStateViewProps) => {
  const { state, _id } = shopping;

  const { shoppingChangeState } = useShoppingChangeState();

  return (
    <Formux<State>
      value={{ state }}
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
            <FieldSelect<{ value: ShoppingState; label: string; colorsClassName: string }>
              name="state"
              optionToValue={({ value }) => value}
              renderValue={({ label, colorsClassName }) => (
                <div className={cn('py-0.5 px-2 rounded-2xl', colorsClassName)}>{label}</div>
              )}
              renderOption={({ label, colorsClassName }) => (
                <div className={cn('py-0.5 px-2 rounded-2xl', colorsClassName)}>{label}</div>
              )}
              items={[
                {
                  value: 'REQUESTED',
                  label: 'Solicitada',
                  colorsClassName: 'bg-yellow-500 text-white',
                },
                {
                  value: 'DELIVERED',
                  label: 'Entregada',
                  colorsClassName: 'bg-green-500 text-white',
                },
                {
                  value: 'REJECTED',
                  label: 'Rechazada',
                  colorsClassName: 'bg-red-500 text-white',
                },
              ]}
            />
          </form>
        );
      }}
    </Formux>
  );
  //
  return <>{getShoppingStateLabel(state)}</>;
};
