import { forwardRef, useEffect, useMemo, useState } from 'react';

import { EmptyImage } from 'components/empty-image';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { HtmlTextContainer } from 'components/html-text-container';
import { IconButton } from 'components/icon-button';
import { IconButtonRemove } from 'components/icon-button-remove';
import { Input } from 'components/input';

import { useModal } from 'features/modal/useModal';

import SvgExternalLinkAltSolid from 'icons/ExternalLinkAltSolid';
import SvgPlusSolid from 'icons/PlusSolid';
import { Image, ImageFile } from 'types/general';
import { getFileImageSize } from 'utils/file';
import { cn, getFlattenArray, removeRow, updateRow } from 'utils/general';

export interface FieldInputImagesProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldWrapperProps {
  multi?: boolean;
  getImageSrc?: (src: string) => string;
  max?: number;
  enabledImageHref?: boolean;
}

type ImageElement = Image | ImageFile | undefined | null;

type State = Array<ImageElement>;

export const FieldInputImages = forwardRef<HTMLInputElement, FieldInputImagesProps>(
  (props, ref) => {
    const {
      className,
      label,
      multi,
      max,
      getImageSrc: getImageSrcProp,
      enabledImageHref,
      ...omittedProps
    } = props;

    const { pushModal } = useModal();
    const { field, error } = useFormField(props);

    const { value } = field;

    const [state, setState] = useState<State>([]);

    const [stateToPreview, setStateToPreview] = useState<State>([undefined]);
    const [previewIndex, setPreviewIndex] = useState<number>(0);

    const addOneEmptyPreview = (s: State): State => {
      return [...s, undefined];
    };

    const getImageSrc = (image: Image | ImageFile) => {
      if (image.src instanceof File) {
        return URL.createObjectURL(image.src);
      }

      if (typeof image.src === 'string') {
        return getImageSrcProp?.(image.src) || '';
      }

      return '';
    };

    const previewImage = useMemo<ImageElement>(() => {
      const currentImage = stateToPreview[previewIndex];

      if (!currentImage) {
        return undefined;
      }

      return currentImage;
    }, [previewIndex, stateToPreview]);

    useEffect(() => {
      if (value !== state) {
        const newState = (value || []) as unknown as State;
        setState(newState);
        const newPreviewState = addOneEmptyPreview(newState);
        setStateToPreview(newPreviewState);
      }
    }, [value, max]);

    const getFlattenState = (newState: State): State => {
      return getFlattenArray(newState, (val) => !!val?.src);
    };

    const handleChange = async (
      image: File | Image | null | undefined,
      action: 'add' | 'remove' | 'change',
    ) => {
      let newStateToPreview = [...stateToPreview];

      switch (action) {
        case 'add': {
          if (!image) return;

          if (image instanceof File) {
            newStateToPreview = updateRow(
              newStateToPreview,
              {
                src: image,
                ...(await getFileImageSize(image)),
              },
              previewIndex,
            );
          } else {
            newStateToPreview = updateRow(newStateToPreview, image, previewIndex);
          }

          newStateToPreview = addOneEmptyPreview(newStateToPreview);

          if (multi) {
            setPreviewIndex(newStateToPreview.length - 1);
          }
          break;
        }
        case 'remove': {
          newStateToPreview = removeRow(newStateToPreview, previewIndex);
          setPreviewIndex(previewIndex ? previewIndex - 1 : 0);

          break;
        }
        case 'change': {
          if (!image) return;

          if (image instanceof File) {
            newStateToPreview = updateRow(
              newStateToPreview,
              {
                ...newStateToPreview[previewIndex],
                src: image,
                ...(await getFileImageSize(image)),
              },
              previewIndex,
            );
          } else {
            newStateToPreview = updateRow(
              newStateToPreview,
              {
                ...newStateToPreview[previewIndex],
                ...image,
              },
              previewIndex,
            );
          }

          break;
        }
        default:
          break;
      }

      setStateToPreview(newStateToPreview);

      const newState = getFlattenState(newStateToPreview);

      setState(newState);

      field.onBlur({
        target: {
          name: field.name,
        },
      });

      field.onChange({
        target: {
          name: field.name,
          value: newState,
        },
      });
    };

    const handleAddManyImages = async (images: Array<Image | File>) => {
      let newStateToPreview = [...stateToPreview];

      newStateToPreview.pop(); //remove the empty preview

      //add images recursively
      const addImages = async (
        images: Array<ImageElement>,
        imagesToAdd: Array<Image | File>,
        index: number,
      ): Promise<void> => {
        const image = imagesToAdd[index];

        if (image instanceof File) {
          images.push({
            src: image,
            ...(await getFileImageSize(image)),
          });
        } else {
          images.push(image);
        }

        if (index < imagesToAdd.length - 1) {
          await addImages(images, imagesToAdd, index + 1);
        }
      };

      await addImages(newStateToPreview, images, 0);

      newStateToPreview = addOneEmptyPreview(newStateToPreview); // add empty preview
      setPreviewIndex(newStateToPreview.length - 1); //set the last preview

      setStateToPreview(newStateToPreview);

      const newState = getFlattenState(newStateToPreview);

      setState(newState);

      field.onChange({
        target: {
          name: field.name,
          value: newState,
        },
      });
    };

    const handleChangeHref = (href: string) => {
      let newStateToPreview = [...stateToPreview];

      const current = newStateToPreview[previewIndex];

      if (current) {
        newStateToPreview = updateRow(
          newStateToPreview,
          {
            ...current,
            href,
          },
          previewIndex,
        );

        setStateToPreview(newStateToPreview);
        const newState = getFlattenState(newStateToPreview);
        setState(newState);

        field.onChange({
          target: {
            name: field.name,
            value: newState,
          },
        });
      }
    };

    const handleOpenCatalogsSearchImage = () => {
      pushModal(
        'CatalogsSearchImage',
        {
          onSelected: (images) => handleAddManyImages(images),
          multi: true,
        },
        { emergent: true },
      );
    };
    return (
      <FormFieldWrapper label={label} error={error} className={className}>
        {multi && (
          <div className="flex items-center justify-start gap-2 mb-1">
            {stateToPreview?.map((image, index) => {
              const selected = index === previewIndex;

              return (
                <div
                  key={index}
                  className={cn('h-8 w-10 cursor-pointer', {
                    'border-gray-700 border-2 rounded-md p-0.5': selected,
                  })}
                  onClick={() => setPreviewIndex(index)}
                >
                  {image ? (
                    <img src={getImageSrc(image)} className="h-full w-full" />
                  ) : (
                    <div className="relative h-full w-full text-gray-500">
                      <EmptyImage key={index} className="h-full w-full" />
                      <SvgPlusSolid className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div
          className={cn('relative h-48', {
            'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error,
          })}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();

            const fileArray: Array<File> = Array.from(event.dataTransfer.files);

            handleAddManyImages(fileArray);
          }}
        >
          {previewImage ? (
            <>
              <img
                src={getImageSrc(previewImage)}
                width={previewImage.width}
                height={previewImage.height}
                className="object-contain w-full h-full border-2 p-2 border-dashed border-gray-300"
              />

              <IconButtonRemove
                className="!absolute top-1 right-0"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(null, 'remove');
                }}
              />
            </>
          ) : (
            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 sm:px-6 py-10">
              <HtmlTextContainer className="text-center">
                <EmptyImage className="mx-auto h-12 w-12 text-gray-300" />
                <ol className="mt-4 text-sm leading-6 text-gray-600">
                  <li>
                    <label
                      htmlFor={field.name}
                      className={cn(
                        'relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500',
                      )}
                    >
                      <span>Seleccione imagen en su galería</span>
                      <input
                        ref={ref}
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        {...omittedProps}
                        {...field}
                        value=""
                        onChange={(event) => {
                          handleChange(
                            event.target.files?.[0],
                            previewIndex === stateToPreview.length - 1 ? 'add' : 'change',
                          );
                        }}
                      />
                    </label>
                  </li>
                  <li>
                    <span
                      className={cn(
                        'relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500',
                      )}
                      onClick={() => {
                        handleOpenCatalogsSearchImage();
                      }}
                    >
                      Nuestros catálogos.
                    </span>
                  </li>
                </ol>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 5MB</p>
              </HtmlTextContainer>
            </div>
          )}
        </div>

        {previewImage && enabledImageHref && (
          <Input
            placeholder="Escriba la url promocional de esta imagen del banner (opcional). Ejemplo: https://example.com"
            value={stateToPreview[previewIndex]?.href || ''}
            onChange={(e) => {
              e.preventDefault();
              handleChangeHref(e.target.value);
            }}
            className="w-full"
            endElement={
              <IconButton
                svg={SvgExternalLinkAltSolid}
                title="Ir al link"
                preventDefault
                onClick={() => window.open(stateToPreview[previewIndex]?.href || '', '_blank')}
              />
            }
          />
        )}
      </FormFieldWrapper>
    );
  },
);
