import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';
import { Modal } from 'components/modal';

import { useAddOneBusiness } from 'features/api/business/useAddOneBusiness';
import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';
import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';
import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { usePortal } from 'hooks/usePortal';

import { FieldBusinessCategoriesSelect } from './FieldBusinessCategoriesSelect';

import { Formik } from 'formik';
import { FormRouteName } from 'pages/@common/form-route-name';
import { Business } from 'types/business';
import { getRouteName } from 'utils/business';

export interface BusinessNewProps {
  callAfarResources?: CallAfarResources;
  routeName?: string;
}

export const BusinessNew = ({ callAfarResources, routeName }: BusinessNewProps) => {
  const { onClose } = useModal();

  const { onCallAfar } = useCallFromAfar();

  const { getAllBusiness } = useGetAllBusiness();

  const { addOneBusiness } = useAddOneBusiness();
  const { updateOneBusiness } = useUpdateOneBusiness();

  const { getOneBusiness } = useGetOneBusiness();

  const business = getOneBusiness.data;


  useEffect(() => {
    if (routeName) {
      getOneBusiness.fetch({ routeName });
    }
  }, []);

  const debouncer = useDebouncer();

  const portal = usePortal();

  const getFormErrors = useGetFormErrors();

  const routeValidationErrorMessage = 'Ese nombre de negocio ya existe.';

  const newPostForm = (
    <Formik<Pick<Business, 'categories' | 'name'>>
      initialValues={{
        categories: [],
        name: '',
        ...(business || {}),
      }}
      enableReinitialize
      validate={(values) => {
        return getFormErrors(values, [
          {
            field: 'categories',
            type: 'required',
          },
          {
            field: 'categories',
            type: 'custom',
            customCb: (val) => val.length > 0,
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
        ]);
      }}
      onSubmit={() => {}}
    >
      {({ errors, values, isValid }) => {

        return (
          <form>
            <FieldInput
              id="business-name"
              name="name"
              autoComplete="business-name"
              label="Nombre del negocio"
            />

            <FormRouteName
              routeName={getRouteName(values.name)}
              error={routeValidationErrorMessage === errors.name}
              className="mt-3"
            />

            <FieldBusinessCategoriesSelect label="Categorías" className='mt-6'  name='categories' />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOneBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  if (business) {
                    const { name } = values;

                    updateOneBusiness.fetch(
                      {
                        routeName: business.routeName,
                        update: {
                          name,
                          routeName: getRouteName(name),
                        },
                      },
                      {
                        onAfterSuccess: () => {
                          onClose();
                          onCallAfar(callAfarResources, {
                            // TODO the service not return the updated value
                            ...business,
                            name,
                            routeName: getRouteName(name),
                          });
                        },
                      },
                    );
                  } else {
                    const { categories, name } = values;

                    addOneBusiness.fetch(
                      {
                        categories,
                        name,
                        routeName: getRouteName(name),
                      },
                      {
                        onAfterSuccess: (response) => {
                          onClose();
                          onCallAfar(callAfarResources, response);
                        },
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
    </Formik>
  );

  return (
    <Modal
      title={business ? 'Editar negocio' : 'Crear negocio'}
      content={newPostForm}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={portal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
