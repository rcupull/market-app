import { useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { FieldInput } from 'components/field-input';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { useUpdateBusinessPostCategories } from 'features/api/business/useUpdateBusinessPostCategories';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { Portal, usePortal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { Formik } from 'formik';
import { PostCategory } from 'types/business';
import { getPostCategoryTag } from 'utils/business';
import { addRow, cn, isEqualObj, removeRow, updateRow } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  value: Array<PostCategory>;
  onChange: (value: Array<PostCategory>) => void;
}

export const Component = ({ portal }: ComponentProps) => {
  const { business, onFetch } = useBusiness();
  const { onClose } = useModal();

  const { routeName } = business || {};

  const initialCategories = business?.postCategories || [];
  const portalAdd = usePortal();

  const { updateBusinessPostCategories } = useUpdateBusinessPostCategories();
  const [state, setState] = useState<Array<PostCategory>>(initialCategories);

  const { pushModal } = useModal();

  const getFormErrors = useGetFormErrors();

  if (!routeName) {
    return <></>;
  }

  return (
    <>
      <div className="flex">
        <Formik
          initialValues={{
            label: '',
          }}
          validate={(values) => {
            return getFormErrors(values, [
              {
                field: 'label',
                type: 'required',
              },
              {
                field: 'label',
                type: 'custom',
                message: 'Esa categoría ya existe.',
                customCb: (label) => {
                  return !state.map(({ label }) => label).includes(label);
                },
              },
            ]);
          }}
          onSubmit={() => {}}
        >
          {({ values, isValid, resetForm }) => {
            return (
              <form className="w-full">
                <FieldInput
                  id="postCategoryLabel"
                  name="label"
                  placeholder='Escriba una nueva categoría, ej. "Productos en oferta", "Recientes", etc"'
                />

                {portalAdd.getPortal(
                  <Button
                    label="Agregar categoría"
                    disabled={!isValid}
                    stopPropagation
                    onClick={() => {
                      const { label } = values;

                      setState(
                        addRow(state, {
                          label,
                          tag: getPostCategoryTag(label),
                        }),
                      );
                      resetForm();
                    }}
                    variant="primary"
                    className="ml-4"
                  />,
                )}
              </form>
            );
          }}
        </Formik>
        <div ref={portalAdd.ref} />
      </div>

      <div className="flex flex-wrap mt-3 gap-3 border border-gray-300 rounded-md p-3 ">
        {state.map((cat, index) => {
          const { label, hidden } = cat;
          return (
            <div
              key={index}
              className={cn('flex items-center gap-2 border border-gray-400 rounded-md p-2', {
                'bg-gray-200': hidden,
              })}
            >
              {label}
              <IconButtonRemove
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  pushModal(
                    'Confirmation',
                    {
                      useProps: () => {
                        const { onClose } = useModal();

                        return {
                          content: (
                            <div>
                              Al eliminar una categoría estará removiendo esta clasificación de
                              todas las publicaciones de su negocio y es un cambio irreversible.
                              Seguro que desea eliminar la categoría{' '}
                              <span className="font-bold">{label}</span>?
                            </div>
                          ),
                          badge: <Badge variant="error" />,
                          primaryBtn: (
                            <ButtonRemove
                              label="Eliminar"
                              onClick={() => {
                                setState(removeRow(state, index));
                                onClose();
                              }}
                            />
                          ),
                        };
                      },
                    },
                    { emergent: true },
                  );
                }}
              />

              <IconButtonShowHide
                hidden={hidden}
                onClick={() => {
                  pushModal(
                    'Confirmation',
                    {
                      useProps: () => {
                        const { onClose } = useModal();

                        return {
                          title: `${hidden ? 'Mostrar' : 'Ocultar'} categoría`,
                          content: (
                            <>
                              {hidden ? (
                                <div>
                                  Usted está mostrando esta categoría y podrá ser usada para filtrar
                                  sus publicaciones en la página de su negocio. Desea continuar?
                                </div>
                              ) : (
                                <div>
                                  Usted está ocultando esta categoría y no será visible en el filtro
                                  por categorias en la página de su negocio. Desea continuar?
                                </div>
                              )}
                            </>
                          ),
                          badge: <Badge variant="info" />,
                          primaryBtn: (
                            <Button
                              label="Continuar"
                              onClick={() => {
                                setState(updateRow(state, { ...cat, hidden: !hidden }, index));
                                onClose();
                              }}
                            />
                          ),
                        };
                      },
                    },
                    { emergent: true },
                  );
                }}
              />
            </div>
          );
        })}
      </div>

      {portal.getPortal(
        <ButtonSave
          disabled={isEqualObj(state, initialCategories)}
          isBusy={updateBusinessPostCategories.status.isBusy}
          onClick={() => {
            updateBusinessPostCategories.fetch(
              { postCategories: state, routeName },
              {
                onAfterSuccess: () => {
                  onFetch({ routeName });
                  onClose();
                },
              },
            );
          }}
        />,
      )}
    </>
  );
};
