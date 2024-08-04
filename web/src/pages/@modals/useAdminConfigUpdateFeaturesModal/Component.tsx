import { useEffect, useState } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonSave } from 'components/button-save';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useUpdateConfigAdmin } from 'features/api/admin/useUpdateConfigAdmin';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { AdminConfigFeature } from 'types/admin';
import { isNullOrUndefinedOrEmptyString } from 'utils/general';

type State = Array<AdminConfigFeature>;

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { data, init } = useAdminConfig();
  const { updateConfigAdmin } = useUpdateConfigAdmin();
  const { onClose } = useModal();
  const [state, setState] = useState<State>([]);

  useEffect(() => {
    setState(data?.features || []);
  }, [data?.features]);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-end">
          <ButtonNew
            label="Añadir feature"
            onClick={() => {
              setState([
                ...state,
                {
                  key: '',
                  enabled: false,
                  description: ''
                }
              ]);
            }}
          />
        </div>
        {state.map((feature, index) => {
          return (
            <div key={index}>
              <Formux<AdminConfigFeature>
                value={feature}
                onChange={(feature) => {
                  const newstate = [...state];
                  newstate[index] = feature;
                  setState(newstate);
                }}
                validate={[
                  {
                    field: 'key',
                    type: 'required',
                    message: 'El campo Key es requerido'
                  },
                  {
                    field: 'key',
                    type: 'custom',
                    customCb: (value) => {
                      return !state.some((feature, i) =>
                        i === index ? false : feature.key === value
                      );
                    },
                    message: 'La key ya existe'
                  }
                ]}
              >
                {() => {
                  return (
                    <form className="w-full flex flex-col sm:flex-row gap-4 border-b border-gray-300 p-4">
                      <FieldCheckbox name="enabled" className="mt-11" />

                      <FieldInput
                        label="Key"
                        name="key"
                        placeholder='Escribir la "key" con uppercase and underscore'
                        className="w-full"
                        typeByRegex={/[A-Z_]+/}
                      />

                      <FieldInput label="Descripción" name="description" className="w-full" />
                    </form>
                  );
                }}
              </Formux>
            </div>
          );
        })}
      </div>
      {portal.getPortal(
        <ButtonSave
          isBusy={updateConfigAdmin.status.isBusy}
          onClick={() => {
            updateConfigAdmin.fetch(
              {
                features: state.filter((feature) => !isNullOrUndefinedOrEmptyString(feature.key))
              },
              {
                onAfterSuccess: () => {
                  init();
                  onClose();
                }
              }
            );
          }}
          variant="primary"
          className="w-full"
        />
      )}
    </>
  );
};

export default Component;
