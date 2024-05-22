import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { ButtonSave } from 'components/button-save';
import { FieldSelect } from 'components/field-select';
import { Formux } from 'components/formux';

import { useShoppingChangeState } from 'features/api/shopping/useShoppingChangeState';
import { useModal } from 'features/modal/useModal';

import { FetchStatus } from 'types/api';
import { Shopping, ShoppingState } from 'types/shopping';
import { cn, isEqual } from 'utils/general';

interface State {
  state: ShoppingState;
}
export interface ShoppingStateViewProps {
  shopping: Shopping;
  onAfterSuccess?: () => void;
  fetchStatus: FetchStatus;
}
export const ShoppingStateView = ({
  shopping,
  onAfterSuccess,
  fetchStatus,
}: ShoppingStateViewProps) => {
  const { state, _id } = shopping;
  const [formState, setFormState] = useState<State>({ state });
  const { pushModal } = useModal();

  useEffect(() => {
    if (fetchStatus.isSuccess) {
      setFormState({ state });
    }
  }, [fetchStatus.isSuccess]);

  return (
    <Formux<State>
      value={formState}
      onChange={(newFormState) => {
        setFormState(newFormState);

        if (!isEqual(newFormState, formState)) {
          pushModal(
            'Confirmation',
            {
              useProps: () => {
                const { onClose } = useModal();

                const { shoppingChangeState } = useShoppingChangeState();

                return {
                  content: 'Seguro que desea actualizar el estado de esta orden de compra?',
                  badge: <Badge variant="warning" />,
                  primaryBtn: (
                    <ButtonSave
                      label="Actualizar"
                      isBusy={shoppingChangeState.status.isBusy}
                      onClick={() => {
                        const { state } = newFormState;

                        shoppingChangeState.fetch(
                          { state, shoppingId: _id },
                          {
                            onAfterSuccess: () => {
                              onClose();
                              onAfterSuccess?.();
                            },
                          },
                        );
                      }}
                    />
                  ),
                  secondaryBtn: (
                    <ButtonClose
                      onClick={() => {
                        const { state } = shopping;
                        setFormState({ state });
                        onClose();
                      }}
                    />
                  ),
                };
              },
            },
            { emergent: true },
          );
        }
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
};
