import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';

import { useUpdateUserAccessAdmin } from 'features/api/admin/useUpdateUserAccessAdmin';

import { Portal } from 'hooks/usePortal';

import { Access } from 'types/admin';
import { User } from 'types/auth';

interface State extends Pick<Required<User>, 'specialAccess'> {}

export interface ComponentProps {
  portal: Portal;
  user: User;
  onAfterSuccess: () => void;
  allSpecialAccess: Array<Access>;
}

export const Component = ({ portal, user, onAfterSuccess, allSpecialAccess }: ComponentProps) => {
  const { updateUserAccessAdmin } = useUpdateUserAccessAdmin();

  return (
    <>
      <Formux<State>
        value={{
          specialAccess: user.specialAccess || [],
        }}
      >
        {({ value }) => {
          return (
            <form className="w-full">
              <FieldRadioGroup<{ value: string }>
                label="Imágenes"
                name="specialAccess"
                renderOption={({ checked, item }) => {
                  return <FieldCheckbox noUseFormik value={checked} label={item.value} />;
                }}
                optionToValue={({ value }) => value}
                items={allSpecialAccess.map((value) => ({
                  value,
                }))}
                multi
                containerClassName="flex items-center flex-wrap gap-4"
              />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateUserAccessAdmin.status.isBusy}
                  formuxSubmit
                  onClick={() => {
                    const { specialAccess } = value;

                    updateUserAccessAdmin.fetch(
                      {
                        specialAccess,
                        userId: user._id,
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
      </Formux>
    </>
  );
};

export default Component;
