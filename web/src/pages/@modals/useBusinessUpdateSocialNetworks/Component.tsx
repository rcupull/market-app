import { useMemo } from 'react';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';
import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';

interface State {
  face: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
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
    }),
    [business],
  );

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const renderFieldLink = (field: React.ReactNode, href: string) => {
    return (
      <div className="flex items-center w-full">
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
            {renderFieldLink(
              <FieldInput label="Facebook" name="face" className="w-full mt-4" />,
              values.face,
            )}
            {renderFieldLink(
              <FieldInput label="Instagram" name="instagram" className="w-full mt-4" />,
              values.instagram,
            )}
            {renderFieldLink(
              <FieldInput label="Twitter" name="twitter" className="w-full mt-4" />,
              values.twitter,
            )}
            {renderFieldLink(
              <FieldInput label="Linkedin" name="linkedin" className="w-full mt-4" />,
              values.linkedin,
            )}

            {portal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { face, instagram, twitter, linkedin, youtube } = values;

                  updateOneBusiness.fetch(
                    {
                      update: {
                        socialLinks: {
                          face,
                          instagram,
                          twitter,
                          linkedin,
                          youtube,
                        },
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
