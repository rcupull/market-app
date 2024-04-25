import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { BusinessShoppingStrategy } from 'types/business';

interface State {
  face: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  whatsAppPhoneNumber: string;
  shoppingStrategy: BusinessShoppingStrategy;
}

export interface ComponentProps {
  portal: Portal;
  options?: FetchOptions;
}

export const Component = ({ portal, options }: ComponentProps) => {
  const { business } = useBusiness();
  const { onClose } = useModal();

  const { updateOneBusiness } = useUpdateOneBusiness();

  const initialValues = useMemo<State>(
    () => ({
      face: business?.socialLinks?.face || '',
      instagram: business?.socialLinks?.instagram || '',
      twitter: business?.socialLinks?.twitter || '',
      linkedin: business?.socialLinks?.linkedin || '',
      youtube: business?.socialLinks?.youtube || '',
      whatsAppPhoneNumber: business?.whatsAppPhoneNumber || '',
      shoppingStrategy: business?.shoppingStrategy || 'none',
    }),
    [business],
  );

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const renderFieldLink = (field: React.ReactNode, href: string) => {
    return (
      <div className="flex items-center mt-2 w-full">
        {field}
        <a href={href} className="text-nowrap ml-2 hyperlink mt-8" target="_blank" rel="noreferrer">
          Ir al link
        </a>
      </div>
    );
  };

  return (
    <Formik<State> initialValues={initialValues} enableReinitialize onSubmit={() => {}}>
      {({ values, isValid }) => {
        return (
          <form className="w-full">
            <FieldInput label="Teléfono" name="whatsAppPhoneNumber" className="w-full" />

            {renderFieldLink(
              <FieldInput label="Facebook" name="face" className="w-full" />,
              values.face,
            )}
            {renderFieldLink(
              <FieldInput label="Instagram" name="instagram" className="w-full" />,
              values.instagram,
            )}
            {renderFieldLink(
              <FieldInput label="Twitter" name="twitter" className="w-full" />,
              values.twitter,
            )}
            {renderFieldLink(
              <FieldInput label="Linkedin" name="linkedin" className="w-full" />,
              values.linkedin,
            )}

            <FieldSelect<{ value: BusinessShoppingStrategy }>
              label="Estratégia de venta"
              renderOption={({ value }) => value}
              renderValue={({ value }) => value}
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'none',
                },
                {
                  value: 'whatsAppWithOwner_pickUpProduct',
                },
                {
                  value: 'addToCart_whatsAppWithOwner_pickUpProduct',
                },
              ]}
              name="shoppingStrategy"
              className="w-full"
            />

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const {
                    face,
                    instagram,
                    twitter,
                    linkedin,
                    youtube,
                    whatsAppPhoneNumber,
                    shoppingStrategy,
                  } = values;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        whatsAppPhoneNumber,
                        socialLinks: {
                          face,
                          instagram,
                          twitter,
                          linkedin,
                          youtube,
                        },
                        shoppingStrategy,
                      },
                      routeName,
                    },
                    {
                      onAfterSuccess: () => {
                        options?.onAfterSuccess?.({});
                        onClose();
                      },
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
