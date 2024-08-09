import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useCloseContext } from 'features/modal/closeContext/useCloseContext';
import { useModal } from 'features/modal/useModal';

import { Portal, usePortal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { BusinessBankAccount, BusinessBankAccountStatus } from 'types/business';
import { cn, isNumber, removeRow } from 'utils/general';

export interface State {
  bankAccounts: Array<BusinessBankAccount>;
  currentAccount?: number;
}
export interface ComponentProps {
  portal: Portal;
}
export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const { onChangeUnsavedChanges } = useCloseContext();

  const portals = [usePortal(), usePortal(), usePortal()];

  const getAccountStatusLabel = (status: BusinessBankAccountStatus) => {
    switch (status) {
      case BusinessBankAccountStatus.NOT_VALIDATED: {
        return 'Sin validar';
      }
      case BusinessBankAccountStatus.SENT_VALIDATION: {
        return 'Validación enviada';
      }
      case BusinessBankAccountStatus.VALIDATED: {
        return 'Validada';
      }
      default: {
        return 'Estado desconocido';
      }
    }
  };
  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  return (
    <Formux<State>
      value={{
        bankAccounts: business.bankAccounts || [],
        currentAccount: business.bankAccounts?.findIndex(({ current }) => current)
      }}
    >
      {({ value, hasChange, setValue }) => {
        onChangeUnsavedChanges(hasChange);

        return (
          <form className="w-full flex flex-col items-center">
            {portals.map((portal, index) => {
              const status: BusinessBankAccountStatus | undefined =
                value.bankAccounts[index]?.status;

              return portal.getPortal(
                <div className="flex flex-col items-center">
                  {!!index && <Divider />}
                  <FieldInput
                    label="Alias"
                    placeholder="Ej: Cuenta fiscal de Ramiro"
                    name={`bankAccounts.${index}.alias`}
                    className="w-80"
                  />
                  <FieldInput
                    label="Número de cuenta"
                    placeholder="Ej: 9258 5555 5555 5555"
                    name={`bankAccounts.${index}.accountNumber`}
                    typeOnlyNumbers
                    typeMaxLength={16}
                    className="w-80 mt-2"
                  />
                  {status && (
                    <div
                      className={cn('mt-2 font-bold', {
                        'text-red-500': status === BusinessBankAccountStatus.NOT_VALIDATED,
                        'text-orange-500': status === BusinessBankAccountStatus.SENT_VALIDATION,
                        'text-green-500': status === BusinessBankAccountStatus.VALIDATED
                      })}
                    >{`Estado: ${getAccountStatusLabel(status)}`}</div>
                  )}
                </div>
              );
            })}

            <div className="my-3">
              Modifique sus cuentas de banco y seleccione una de ellas como la actual para recibir
              los pagos por sus ventas.
            </div>

            <FieldRadioGroup<{ value: number }>
              name="currentAccount"
              renderOption={({ checked, index }) => {
                const hasAccountNumber = value.bankAccounts[index]?.accountNumber;

                return (
                  <div className="flex flex-col items-center gap-3">
                    <div ref={portals[index].ref} />
                    {hasAccountNumber && (
                      <div className="flex items-center gap-4">
                        <IconButtonRemove
                          preventDefault
                          onClick={() => {
                            setValue((value) => {
                              return {
                                ...value,
                                bankAccounts: removeRow(value.bankAccounts, index)
                              };
                            });
                          }}
                          className=""
                        />
                        <FieldCheckbox noUseFormik value={checked} />
                      </div>
                    )}
                  </div>
                );
              }}
              optionToValue={({ value }) => value}
              items={portals.map((_, index) => ({
                value: index
              }))}
              containerClassName="flex flex-col gap-4"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                formuxSubmit
                onClick={() => {
                  const { bankAccounts, currentAccount } = value;

                  const indexToCompare =
                    isNumber(currentAccount) && currentAccount > bankAccounts.length - 1
                      ? 0
                      : currentAccount;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        bankAccounts: bankAccounts.map((account, index) => ({
                          ...account,
                          current: indexToCompare === index
                        }))
                      },
                      routeName
                    },
                    {
                      onAfterSuccess: () => {
                        onFetch({ routeName });
                        onClose();
                      }
                    }
                  );
                }}
                variant="primary"
                className="w-full"
              />
            )}
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
