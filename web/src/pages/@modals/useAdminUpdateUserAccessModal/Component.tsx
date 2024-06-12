import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';

import { useUpdateUserSpecialAccess } from 'features/api/admin/useUpdateUserSpecialAccess';

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
  const { updateUserSpecialAccess } = useUpdateUserSpecialAccess();

  return (
    <>
      <Formux<State>
        value={{
          specialAccess: user.specialAccess || [],
        }}
      >
        {({ value, isValid }) => {
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
                  isBusy={updateUserSpecialAccess.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    const { specialAccess } = value;

                    updateUserSpecialAccess.fetch(
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
