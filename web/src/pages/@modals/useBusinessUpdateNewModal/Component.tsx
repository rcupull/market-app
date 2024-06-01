import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useAddOneBusiness } from 'features/api/business/useAddOneBusiness';
import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { useDebouncer } from 'hooks/useDebouncer';
import { Portal } from 'hooks/usePortal';

import { FieldBusinessCategoriesSelect } from './FieldBusinessCategoriesSelect';

import { FormRouteName } from 'pages/@common/form-route-name';
import { Business } from 'types/business';
import { getRouteName } from 'utils/business';
import { getRequiredLabel } from 'utils/form';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess: (response: Business | void) => void;
  business?: Business;
}

export const Component = ({ portal, business, onAfterSuccess }: ComponentProps) => {
  const { getAllBusiness } = useGetAllBusiness();

  const { addOneBusiness } = useAddOneBusiness();
  const { updateOneBusiness } = useUpdateOneBusiness();

  const debouncer = useDebouncer();

  const routeValidationErrorMessage = 'Ese nombre de negocio ya existe.';

  return (
    <>
      <Formux<Pick<Business, 'categories' | 'name'>>
        value={{
          categories: [],
          name: '',
          ...(business || {}),
        }}
        validate={[
          {
            field: 'categories',
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
            message: routeValidationErrorMessage,
            customCb: async (name) => {
              const routeName = getRouteName(name);
              return new Promise((resolve) => {
                debouncer(() => {
                  getAllBusiness.fetch(
                    { routeNames: [routeName] },
                    {
                      onAfterSuccess: (response) => {
                        const { data } = response;
                        const exists = !!data.length;
                        resolve(!exists);
                      },
                    },
                  );
                }, 500);
              });
            },
          },
        ]}
      >
        {({ errors, value, isValid }) => {
          return (
            <form>
              <FieldInput
                id="business-name"
                name="name"
                autoComplete="business-name"
                label={getRequiredLabel('Nombre del negocio')}
              />

              {!business && (
                <>
                  <FormRouteName
                    routeName={getRouteName(value.name)}
                    error={routeValidationErrorMessage === errors.name}
                    className="mt-3"
                  />

                  <FieldBusinessCategoriesSelect
                    label={getRequiredLabel('Categorías')}
                    className="mt-6"
                    name="categories"
                  />
                </>
              )}

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={addOneBusiness.status.isBusy}
                  disabled={!isValid}
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
                        },
                      );
                    } else {
                      const { categories, name } = value;

                      addOneBusiness.fetch(
                        {
                          categories,
                          name,
                          routeName: getRouteName(name),
                        },
                        {
                          onAfterSuccess,
                        },
                      );
                    }
                  }}
                  variant="primary"
                  className="w-full"
                />,
              )}
            </form>
          );
        }}
      </Formux>
    </>
  );
};

export default Component;
