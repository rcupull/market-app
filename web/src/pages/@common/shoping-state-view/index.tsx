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

  if (state === 'REJECTED' || state === 'CANCELED' || state === 'DELIVERED') {
    return <ShoppingStateLabel state={state} />;
  }

  const nextStates = (): Array<ShoppingState> => {
    switch (state) {
      case 'REQUESTED':
        return ['REQUESTED', 'APPROVED', 'REJECTED'];
      case 'APPROVED':
        return ['APPROVED', 'PROCESSING', 'REJECTED'];
      case 'PROCESSING':
        return ['PROCESSING' /*, 'READY_TO_DELIVER'*/, 'DELIVERED', 'REJECTED'];
      // case 'READY_TO_DELIVER':
      //   return ['READY_TO_DELIVER', 'DELIVERED', 'REJECTED'];
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
                  ),
                };
              },
            },
            { emergent: true }
          );
        }
      }}
    >
      {() => {
        return (
          <form className="w-36">
            <FieldSelect<{ value: ShoppingState }>
              name="state"
              optionToValue={({ value }) => value}
              renderValue={({ value }) => <ShoppingStateLabel state={value} />}
              renderOption={({ value }) => <ShoppingStateLabel state={value} />}
              items={nextStates().map((value) => ({
                value,
              }))}
            />
          </form>
        );
      }}
    </Formux>
  );
};
