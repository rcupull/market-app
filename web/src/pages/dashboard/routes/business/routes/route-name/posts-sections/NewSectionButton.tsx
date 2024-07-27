import { Badge } from 'components/badge';
import { ButtonNew } from 'components/button-new';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { Formux } from 'components/formux';
import { IconButtonAdd } from 'components/icon-button-add';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSectionModal } from 'pages/@modals/useBusinessNewUpdateSectionModal';
import { PostType } from 'types/post';

export const NewSectionButton = () => {
  const { business, onFetch } = useBusiness();
  const { pushModal } = useModal();
  const { businessNewUpdateSectionModal } = useBusinessNewUpdateSectionModal();

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
                        <FieldRadioGroup<{
                          value: PostType;
                          label: string;
                          description: React.ReactNode;
                        }>
                          name="postType"
                          renderOption={({ checked, item }) => {
                            return (
                              <FieldCheckbox
                                noUseFormik
                                value={checked}
                                label={item.label}
                                description={item.description}
                              />
                            );
                          }}
                          optionToValue={({ value }) => value}
                          items={[
                            {
                              value: 'product',
                              label: 'Productos',
                              description: (
                                <div>
                                  Una sección de productos agrupa los{' '}
                                  <span className="font-bold">productos</span> de su negocio que
                                  tengan las categorías asociadas a dicha sección.
                                </div>
                              ),
                            },
                            {
                              value: 'link',
                              label: 'Enlace',
                              description: (
                                <div>
                                  Una sección de enlace agrupa{' '}
                                  <span className="font-bold">enlaces</span> de su negocio hacia
                                  otros negocios de Asere Market o hacia links externos.
                                </div>
                              ),
                            },
                          ]}
                          containerClassName="flex items-center justify-center gap-8"
                        />

                        {portal.getPortal(
                          <ButtonNew
                            label="Crear sección"
                            onClick={() => {
                              const { postType } = value;
                              onClose();
                              setTimeout(() => {
                                businessNewUpdateSectionModal.open({
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
