import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';
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

import { Formik } from 'formik';
import { FormRouteName } from 'pages/@common/form-route-name';
import { BusinessCategory } from 'types/business';
import { getBusinessCategoryLabel, getRouteName } from 'utils/business';

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
    <Formik
      initialValues={{
        category: '',
        name: '',
        ...(business || {}),
      }}
      enableReinitialize
      validate={(values) => {
        return getFormErrors(values, [
          {
            field: 'category',
            type: 'required',
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

            {!business && (
              <FieldSelect<{ category: BusinessCategory; label: string }>
                items={[
                  {
                    category: 'food',
                    label: getBusinessCategoryLabel('food'),
                  },
                  {
                    category: 'clothing',
                    label: getBusinessCategoryLabel('clothing'),
                  },
                  {
                    category: 'service',
                    label: getBusinessCategoryLabel('service'),
                  },
                  {
                    category: 'tool',
                    label: getBusinessCategoryLabel('tool'),
                  },
                ]}
                renderOption={({ label }) => label}
                renderValue={({ label }) => label}
                optionToValue={({ category }) => category}
                name="category"
                label="Categoría"
                className="mt-6"
              />
            )}

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
                    const { category, name } = values;

                    addOneBusiness.fetch(
                      {
                        category,
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
