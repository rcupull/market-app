import { useEffect, useState } from 'react';
import { Gallery, Image as GalleryImage } from 'react-grid-gallery';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import {
  UseGetCatalogImagesResponse,
  useGetCatalogsImages,
} from 'features/api/images/useGetCatalogsImages';
import { useModal } from 'features/modal/useModal';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { useDebouncer } from 'hooks/useDebouncer';
import { Portal } from 'hooks/usePortal';

import { ThumbnailImageComponent } from './ThumbnailImageComponent';

import { FetchData } from 'types/api';
import { Image } from 'types/general';
import { updateRow } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  onSelected: (images: Array<Image>) => void;
  multi?: boolean;
}

export const Component = ({ portal, multi, onSelected }: ComponentProps) => {
  const { onClose } = useModal();
  const { getCatalogsImages } = useGetCatalogsImages();

  const { data, setData } = useSimpleSlice<FetchData<UseGetCatalogImagesResponse>>(
    'modal_catalogsSearchImage'
  );
  const [allImages, setAllImages] = useState<Array<GalleryImage>>([]);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (data) {
      setSearch(data.search);
      setAllImages(
        data.result.map(({ height, url, width, title }) => ({
          height,
          width,
          src: url,
          alt: title,
        }))
      );
    }
  }, [data]);

  const searchDebouncer = useDebouncer();

  const handleSubmit = () => {
    const selectedImages = allImages.filter(({ isSelected }) => isSelected);
    if (selectedImages.length) {
      onSelected?.(selectedImages.map(({ src, height, width }) => ({ src, height, width })));
    }

    onClose();
  };

  const handleSelect = (index: number) => {
    const image = allImages[index];

    if (multi) {
      setAllImages(updateRow(allImages, { ...image, isSelected: !image.isSelected }, index));
    } else {
      setAllImages(allImages.map((image, i) => ({ ...image, isSelected: i === index })));
    }
  };

  const renderWithCenteredContainer = (children: React.ReactNode): React.ReactNode => {
    return (
      <div className="flex items-center justify-center w-full h-full border-gray-300 rounded-md border-2 border-dashed text-gray-400">
        {children}
      </div>
    );
  };

  const renderImageGallery = (): React.ReactNode => {
    if (getCatalogsImages.status.isBusy) {
      return renderWithCenteredContainer(<SpinnerEllipsis />);
    }

    if (!allImages.length) {
      return renderWithCenteredContainer(<span>No hay imágenes para mostrar</span>);
    }

    return (
      <Gallery
        images={allImages}
        onClick={(index) => handleSelect(index)}
        thumbnailImageComponent={ThumbnailImageComponent}
      />
    );
  };

  return (
    <div>
      <Formux
        value={{
          searchValue: search || '',
        }}
        onChange={({ searchValue }) => {
          if (searchValue && searchValue !== search) {
            searchDebouncer(() => {
              getCatalogsImages.fetch(
                { search: searchValue },
                {
                  onAfterSuccess: setData,
                }
              );
            }, 500);
          }

          setSearch(searchValue);
        }}
      >
        {() => {
          return (
            <form className="flex w-full">
              <FieldInput
                name="searchValue"
                placeholder="Buscar"
                className="w-full"
                preventDefaultEnter
              />
            </form>
          );
        }}
      </Formux>

      <p className="mt-3 text-gray-400">
        {`(${multi ? 'Seleccione una o varias imágenes' : 'Seleccione una imagen'})`}
      </p>
      <div className="h-[calc(100vh-19rem)] overflow-y-auto">{renderImageGallery()}</div>

      {portal.getPortal(<Button label="Seleccionar" onClick={handleSubmit} />)}
    </div>
  );
};

export default Component;
