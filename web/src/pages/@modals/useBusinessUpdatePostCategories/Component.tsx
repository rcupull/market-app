import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { useUpdateBusinessPostCategories } from 'features/api/business/useUpdateBusinessPostCategories';
import { useModal } from 'features/modal/useModal';

import { Portal, usePortal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { PostCategory } from 'types/business';
import { getPostCategoryTag } from 'utils/business';
import { addRow, areEqualArrays, cn, isEqualObj, removeRow, updateRow } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess: () => void;
  setHasUnsavedChanges: (value: boolean) => void;
}

export const Component = ({ portal, onAfterSuccess, setHasUnsavedChanges }: ComponentProps) => {
  const { business } = useBusiness();

  const { routeName } = business || {};

  const initialCategories = business?.postCategories || [];
  const portalAdd = usePortal();

  const { updateBusinessPostCategories } = useUpdateBusinessPostCategories();
  const [state, setState] = useState<Array<PostCategory>>([]);

  useEffect(() => {
    setState(initialCategories);
  }, [initialCategories]);

  const { pushModal } = useModal();

  if (!routeName) {
    return <></>;
  }

  return (
    <>
      <div className="flex">
        <Formux
          value={{
            label: '',
          }}
          validate={[
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
          ]}
        >
          {({ value, isValid, resetForm, hasChange }) => {
            const handleAdd = () => {
              const { label } = value;
              
              console.log(label);
              setState(
                addRow(state, {
                  label,
                  tag: getPostCategoryTag(label),
                }),
              );

              const change = hasChange || !areEqualArrays(state, initialCategories)
              setHasUnsavedChanges(change)
              resetForm();
            };
            
            return (
              <form className="w-full">
                <FieldInput
                  id="postCategoryLabel"
                  name="label"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();

                      handleAdd();
                    }
                  }}
                  placeholder='Escriba una nueva categoría, ej. "Productos en oferta", "Recientes", etc"'
                />

                {portalAdd.getPortal(
                  <Button
                    label="Agregar categoría"
                    disabled={!isValid}
                    stopPropagation
                    onClick={() => handleAdd()}
                    variant="primary"
                    className="ml-4"
                  />,
                )}
              </form>
            );
          }}
        </Formux>
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
                onAfterSuccess,
              },
            );
          }}
        />,
      )}
    </>
  );
};

export default Component;
