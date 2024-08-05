import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { useUpdateBusinessPostCategories } from 'features/api/business/useUpdateBusinessPostCategories';
import { useCloseContext } from 'features/modal/closeContext/useCloseContext';
import { useModal } from 'features/modal/useModal';

import { Portal } from 'hooks/usePortal';

import { useBusiness } from '../../@hooks/useBusiness';

import { PostCategory } from 'types/business';
import { getPostCategoryTag } from 'utils/business';
import { addRow, cn, isEqualObj, removeRow, updateRow } from 'utils/general';

export interface State {
  label: string;
  categories: Array<PostCategory>;
}
export interface ComponentProps {
  portal: Portal;
  onAfterSuccess: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { business } = useBusiness();

  const { routeName } = business || {};

  const initialCategories = business?.postCategories || [];

  const { updateBusinessPostCategories } = useUpdateBusinessPostCategories();

  const { pushModal } = useModal();

  const { onChangeUnsavedChanges } = useCloseContext();

  if (!routeName) {
    return <></>;
  }

  return (
    <div>
      <Formux<State>
        value={{ label: '', categories: initialCategories || [] }}
        validate={({ state }) => [
          {
            field: 'label',
            type: 'required'
          },
          {
            field: 'label',
            type: 'custom',
            message: 'Esa categoría ya existe.',
            customCb: (label) => {
              return !state.categories.map(({ label }) => label).includes(label);
            }
          }
        ]}
      >
        {({ value, hasChange, setValue }) => {
          onChangeUnsavedChanges(hasChange);

          const handleAdd = () => {
            const { label } = value;
            setValue({
              label: '',
              categories: addRow(value.categories, {
                label,
                tag: getPostCategoryTag(label)
              })
            });
          };

          return (
            <>
              <form className="w-full">
                <div className="flex">
                  <FieldInput
                    className="w-full"
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

                  <Button
                    label="Agregar categoría"
                    preventDefault
                    disabled={!value.label}
                    onClick={() => handleAdd()}
                    variant="primary"
                    className="ml-4"
                  />
                </div>
              </form>

              <div className="flex flex-wrap mt-3 gap-3 border border-gray-300 rounded-md p-3 ">
                {value.categories.map((category, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center gap-2 border border-gray-400 rounded-md p-2',
                        {
                          'bg-gray-200': category.hidden
                        }
                      )}
                    >
                      {category.label}
                      <IconButtonRemove
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                          pushModal('Confirmation', {
                            useProps: () => {
                              const { onClose } = useModal();

                              return {
                                content: (
                                  <div>
                                    Al eliminar una categoría estará removiendo esta clasificación
                                    de todas las publicaciones de su negocio y es un cambio
                                    irreversible. Seguro que desea eliminar la categoría{' '}
                                    <span className="font-bold">{category.label}</span>?
                                  </div>
                                ),
                                badge: <Badge variant="error" />,
                                primaryBtn: (
                                  <ButtonRemove
                                    label="Eliminar"
                                    onClick={() => {
                                      setValue({
                                        ...value,
                                        categories: removeRow(value.categories, index)
                                      });

                                      onClose();
                                    }}
                                  />
                                )
                              };
                            }
                          });
                        }}
                      />

                      <IconButtonShowHide
                        hidden={category.hidden}
                        onClick={() => {
                          pushModal('Confirmation', {
                            useProps: () => {
                              const { onClose } = useModal();

                              return {
                                title: `${category.hidden ? 'Mostrar' : 'Ocultar'} categoría`,
                                content: (
                                  <>
                                    {category.hidden ? (
                                      <div>
                                        Usted está mostrando esta categoría y podrá ser usada para
                                        filtrar sus publicaciones en la página de su negocio. Desea
                                        continuar?
                                      </div>
                                    ) : (
                                      <div>
                                        Usted está ocultando esta categoría y no será visible en el
                                        filtro por categorias en la página de su negocio. Desea
                                        continuar?
                                      </div>
                                    )}
                                  </>
                                ),
                                badge: <Badge variant="info" />,
                                primaryBtn: (
                                  <Button
                                    label="Continuar"
                                    onClick={() => {
                                      setValue({
                                        ...value,
                                        categories: updateRow(
                                          value.categories,
                                          { ...category, hidden: !category.hidden },
                                          index
                                        )
                                      });
                                      onClose();
                                    }}
                                  />
                                )
                              };
                            }
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {portal.getPortal(
                <ButtonSave
                  disabled={isEqualObj(value.categories, initialCategories)}
                  isBusy={updateBusinessPostCategories.status.isBusy}
                  onClick={() => {
                    updateBusinessPostCategories.fetch(
                      { postCategories: value.categories, routeName },
                      {
                        onAfterSuccess
                      }
                    );
                  }}
                />
              )}
            </>
          );
        }}
      </Formux>
    </div>
  );
};

export default Component;
