import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { ButtonSave } from 'components/button-save';
import { FieldSelect } from 'components/field-select';
import { Formux } from 'components/formux';

import { useShoppingChangeState } from 'features/api/shopping/useShoppingChangeState';
import { useModal } from 'features/modal/useModal';

import { ShoppingStateLabel } from '../shopping-state-label';

import { FetchStatus } from 'types/api';
import { Shopping, ShoppingState } from 'types/shopping';
import { isEqual } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

interface State {
  state: ShoppingState;
}
export interface ShoppingStateViewProps {
  shopping: Shopping;
  onAfterSuccess?: () => void;
  fetchStatus: FetchStatus;
  businessHasDelivery: boolean;
}
export const ShoppingStateView = ({
  shopping,
  onAfterSuccess,
  fetchStatus,
  businessHasDelivery
}: ShoppingStateViewProps) => {
  const { state, _id } = shopping;
  const [formState, setFormState] = useState<State>({ state });
  const { pushModal } = useModal();

  useEffect(() => {
    if (fetchStatus.isSuccess) {
      setFormState({ state });
    }
  }, [fetchStatus.isSuccess]);

  if (
    state === ShoppingState.REJECTED ||
    state === ShoppingState.CANCELED ||
    state === ShoppingState.DELIVERED
  ) {
    return <ShoppingStateLabel state={state} />;
  }

  const nextStates = (): Array<ShoppingState> => {
    if (businessHasDelivery) {
      switch (state) {
        case ShoppingState.REQUESTED:
          return [ShoppingState.REQUESTED, ShoppingState.APPROVED, ShoppingState.REJECTED];
        case ShoppingState.APPROVED:
          return [ShoppingState.APPROVED, ShoppingState.PROCESSING, ShoppingState.REJECTED];
        case ShoppingState.PROCESSING:
          return [
            ShoppingState.PROCESSING,
            ShoppingState.READY_TO_DELIVERY,
            ShoppingState.REJECTED
          ];
        case ShoppingState.READY_TO_DELIVERY:
          return [ShoppingState.READY_TO_DELIVERY, ShoppingState.DELIVERED, ShoppingState.REJECTED];
        default:
          return [];
      }
    }

    switch (state) {
      case ShoppingState.REQUESTED:
        return [ShoppingState.REQUESTED, ShoppingState.APPROVED, ShoppingState.REJECTED];
      case ShoppingState.APPROVED:
        return [ShoppingState.APPROVED, ShoppingState.PROCESSING, ShoppingState.REJECTED];
      case ShoppingState.PROCESSING:
        return [ShoppingState.PROCESSING, ShoppingState.DELIVERED, ShoppingState.REJECTED];
      default:
        return [];
    }
  };

  return (
    <Formux<State>
      value={formState}
      onChange={(newFormState) => {
        setFormState(newFormState);

        if (!isEqual(newFormState, formState)) {
          pushModal('Confirmation', {
            useProps: () => {
              const { onClose } = useModal();

              const { shoppingChangeState } = useShoppingChangeState();

              return {
                content: (
                  <span>
                    Seguro que desea actualizar el estado de esta orden de compra hacia{' '}
                    <span className="font-bold">{getShoppingStateLabel(newFormState.state)}</span>?
                  </span>
                ),
                badge: <Badge variant="warning" />,
                className: '!w-[30rem]',
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
                          }
                        }
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
                )
              };
            }
          });
        }
      }}
    >
      {() => {
        return (
          <form className="w-48">
            <FieldSelect<{ value: ShoppingState }>
              name="state"
              optionToValue={({ value }) => value}
              renderValue={({ value }) => <ShoppingStateLabel state={value} />}
              renderOption={({ value }) => <ShoppingStateLabel state={value} />}
              items={nextStates().map((value) => ({
                value
              }))}
            />
          </form>
        );
      }}
    </Formux>
  );
};
