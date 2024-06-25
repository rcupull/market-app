import { Badge } from 'components/badge';
import { ButtonNew } from 'components/button-new';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';
import { IconButtonAdd } from 'components/icon-button-add';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { PostType } from 'types/post';

export const NewSectionButton = () => {
  const { business, onFetch } = useBusiness();
  const { pushModal } = useModal();
  const businessNewUpdateSection = useBusinessNewUpdateSection();

  const handleClick = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { onClose } = useModal();
          const portal = usePortal();

          return {
            title: 'Tipo de sección a crear',
            className: 'max-w-lg',
            content: (
              <div>
                <div>Escoja el tipo de sección que desea añadir a la página de su negocio.</div>
                <Formux<{ postType: PostType }>
                  value={{
                    postType: 'product',
                  }}
                >
                  {({ value }) => {
                    return (
                      <form className="mt-10">
                        <FieldRadioGroup<{ value: PostType; label: string }>
                          name="postType"
                          renderOption={({ checked, item }) => {
                            return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
                          }}
                          optionToValue={({ value }) => value}
                          items={[
                            {
                              value: 'product',
                              label: 'Productos',
                            },
                            {
                              value: 'link',
                              label: 'Enlace',
                            },
                          ]}
                          containerClassName="flex items-center justify-center gap-8"
                        />

                        {portal.getPortal(
                          <ButtonNew
                            onClick={() => {
                              const { postType } = value;
                              onClose();
                              setTimeout(() => {
                                businessNewUpdateSection.open({
                                  postType,
                                  onAfterSuccess: () =>
                                    business && onFetch({ routeName: business.routeName }),
                                });
                              }, 100);
                            }}
                            className="w-full sm:w-auto"
                          />,
                        )}
                      </form>
                    );
                  }}
                </Formux>
              </div>
            ),
            badge: <Badge variant="info" />,
            primaryBtn: <div ref={portal.ref} />,
          };
        },
      },
      { emergent: true },
    );
  };

  return (
    <>
      <ButtonNew label="Nueva sección" onClick={handleClick} className="ml-auto hidden sm:block" />
      <IconButtonAdd
        title="Nueva sección"
        onClick={handleClick}
        variant="primary"
        className="ml-auto block sm:hidden"
      />
    </>
  );
};
