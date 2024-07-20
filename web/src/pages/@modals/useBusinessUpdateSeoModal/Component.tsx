import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { FieldTextArea } from 'components/field-text-area';
import { Formux } from 'components/formux';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { BusinessSEO } from 'types/business';

interface State extends BusinessSEO {}

export interface ComponentProps {
  portal: Portal;
}

export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const initialValue: State = {
    title: business?.seo?.title || '',
    description: business?.seo?.description || '',
  };

  return (
    <>
      <Formux<State> value={initialValue}>
        {({ value }) => {
          return (
            <form className="w-full">
              <FieldInput label="Título de la página" name="title" className="mt-6" />

              <FieldTextArea label="Descripción de la página" name="description" className="mt-6" />

              {portal.getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneBusiness.status.isBusy}
                  formuxSubmit
                  onClick={() => {
                    updateOneBusiness.fetch(
                      {
                        update: {
                          seo: value,
                        },
                        routeName,
                      },
                      {
                        onAfterSuccess: () => {
                          onFetch({ routeName });
                          onClose();
                        },
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
    </>
  );
};

export default Component;
