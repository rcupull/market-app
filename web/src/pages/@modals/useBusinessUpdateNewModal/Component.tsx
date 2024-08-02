import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';
import { Formux } from 'components/formux';

import { useAddOneBusiness } from 'features/api/business/useAddOneBusiness';
import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';
import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { useDebouncer } from 'hooks/useDebouncer';
import { Portal } from 'hooks/usePortal';

import { FieldBusinessCategoriesSelect } from './FieldBusinessCategoriesSelect';

import { FormRouteName } from 'pages/@common/form-route-name';
import { Business, BusinessCurrency } from 'types/business';
import { getRouteName } from 'utils/business';
import { getRequiredLabel } from 'utils/form';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess: (response: Business | void) => void;
  business?: Business;
}

export const Component = ({ portal, business, onAfterSuccess }: ComponentProps) => {
  const { getAllBusiness } = useGetAllBusiness();
  const { getOneBusiness } = useGetOneBusiness();

  const { addOneBusiness } = useAddOneBusiness();
  const { updateOneBusiness } = useUpdateOneBusiness();

  const debouncer = useDebouncer();

  const routeValidationErrorMessage = 'Ese nombre de negocio ya existe.';

  return (
    <>
      <Formux<Pick<Business, 'postCategories' | 'name' | 'currency'>>
        value={{
          postCategories: [],
          name: '',
          currency: 'CUP',
          ...(business || {}),
        }}
        validate={[
          {
            field: 'postCategories',
            type: 'custom',
            customCb: (val) => {
              return val.length > 0;
            },
            message: 'Debes seleccionar al menos una categoría',
          },
          {
            field: 'name',
            type: 'required',
          },
          {
            field: 'name',
            type: 'custom',
            customCb: (value) => value.length <= 25,
            message: 'El nombre del negocio no puede superar los 25 caracteres',
          },
          {
            field: 'name',
            type: 'custom',
            message: routeValidationErrorMessage,
            customCb: async (name) => {
              const routeName = getRouteName(name);
              return new Promise((resolve) => {
                debouncer(() => {
                  getOneBusiness.fetch(
                    { routeName },
                    {
                      onAfterSuccess: () => resolve(false),
                      onAfterFailed: () => resolve(true),
                    }
                  );
                }, 500);
              });
            },
          },
        ]}
      >
        {({ errors, value }) => {
          return (
            <form>
              <FieldInput
                id="business-name"
                name="name"
                autoComplete="business-name"
                maxLength={25}
                preventDefaultEnter
                label={
                  <span className="flex flex-col sm:flex-row items-start sm:items-center">
                    {getRequiredLabel('Nombre del negocio')}
                    <span className="text-red-600 text-xs sm:ml-2">
                      (<span className="font-bold">NO</span> se puede modificar una vez creado)
                    </span>
                  </span>
                }
              />

              <>
                <FormRouteName
                  routeName={getRouteName(value.name)}
                  error={routeValidationErrorMessage === errors.name}
                  className="mt-3"
                />

                <FieldSelect<{ currency: BusinessCurrency }>
                  items={[
                    {
                      currency: 'CUP',
                    },
                    {
                      currency: 'MLC',
                    },
                    {
                      currency: 'USD',
                    },
                  ]}
                  renderOption={({ currency }) => currency}
                  renderValue={({ currency }) => currency}
                  optionToValue={({ currency }) => currency}
                  name="currency"
                  label="Moneda"
                  className="mt-6 w-full"
                />

                <FieldBusinessCategoriesSelect
                  label={getRequiredLabel('Categorías')}
                  className="mt-6"
                  name="postCategories"
                />
              </>

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={addOneBusiness.status.isBusy || getAllBusiness.status.isBusy}
                  formuxSubmit
                  onClick={() => {
                    if (business) {
                      const { name } = value;

                      updateOneBusiness.fetch(
                        {
                          routeName: business.routeName,
                          update: {
                            name,
                          },
                        },
                        {
                          onAfterSuccess,
                        }
                      );
                    } else {
                      const { postCategories, name, currency } = value;

                      addOneBusiness.fetch(
                        {
                          postCategories,
                          name,
                          currency,
                          routeName: getRouteName(name),
                        },
                        {
                          onAfterSuccess,
                        }
                      );
                    }
                  }}
                  variant="primary"
                  className="w-full"
                />
              )}
            </form>
          );
        }}
      </Formux>
    </>
  );
};

export default Component;
