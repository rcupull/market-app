import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { Business } from 'types/business';
import { PostFormState } from 'types/post';

interface State extends Pick<Business, 'postFormFields'> {}

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { postFormFields = [], routeName } = business || {};

  const { updateOneBusiness } = useUpdateOneBusiness();

  if (!routeName) {
    return <></>;
  }

  return (
    <Formik<State>
      initialValues={{
        postFormFields,
      }}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({ values, isValid }) => {
        return (
          <form>
            <FieldRadioGroup<{ disabled?: boolean; value: keyof PostFormState }>
              id="logoField"
              name="postFormFields"
              optionToValue={({ value }) => value}
              disabledOption={({ item: { disabled } }) => !!disabled}
              multi
              renderOption={({ item, checked }) => {
                const { value, disabled } = item;
                const label = disabled ? `${value} (requerido)` : value;
                return <FieldCheckbox noUseFormik value={checked} label={label} />;
              }}
              items={[
                {
                  value: 'name', //required
                  disabled: true,
                },
                {
                  value: 'postCategoriesTags', //required
                  disabled: true,
                },
                {
                  value: 'images', //required
                  disabled: true,
                },
                {
                  value: 'postPageLayout',
                },
                {
                  value: 'currency',
                },
                {
                  value: 'clothingSizes',
                },
                {
                  value: 'colors',
                },
                {
                  value: 'description',
                },
                {
                  value: 'details',
                },
                {
                  value: 'discount',
                },
                {
                  value: 'price',
                },
                {
                  value: 'stockAmount',
                },
              ]}
              className="mt-6"
              containerClassName="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  if (!business) return;
                  const { postFormFields } = values;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        postFormFields,
                      },
                      routeName,
                    },
                    {
                      onAfterSuccess,
                    },
                  );
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
};
