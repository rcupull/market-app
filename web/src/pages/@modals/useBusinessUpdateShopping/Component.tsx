import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { isEmpty } from 'utils/general';

interface State {
  whatsAppPhoneNumber?: string;
}

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const value = useMemo<State>(
    () => ({
      whatsAppPhoneNumber: business?.whatsAppPhoneNumber,
    }),
    [business],
  );

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  return (
    <Formux<State> value={value}>
      {({ value, isValid, touched }) => {
        return (
          <form className="w-full">
            <FieldInput
              label="Contacto de WhatsApp"
              name="whatsAppPhoneNumber"
              placeholder="Teléfono: ej: +53533333"
              className="w-60"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                disabled={!isValid || isEmpty(touched)}
                onClick={() => {
                  const { whatsAppPhoneNumber } = value;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        whatsAppPhoneNumber,
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
    </Formux>
  );
};
