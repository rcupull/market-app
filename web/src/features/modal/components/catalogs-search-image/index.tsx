import { useEffect, useState } from 'react';
//eslint-disable-next-line
import { Gallery, Image as GalleryImage } from 'react-grid-gallery';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import {
  UseGetCatalogImagesResponse,
  useGetCatalogsImages,
} from 'features/api/images/useGetCatalogsImages';
import { useModal } from 'features/modal/useModal';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { useDebouncer } from 'hooks/useDebouncer';

import { ThumbnailImageComponent } from './ThumbnailImageComponent';

import { SearchFilter } from 'pages/@common/filters/search-filter';
import { FetchData } from 'types/api';
import { Image } from 'types/general';
import { updateRow } from 'utils/general';

/**
 * https://www.npmjs.com/package/react-grid-gallery
 * https://benhowell.github.io/react-grid-gallery/examples/custom-image-component
 */

export interface CatalogsSearchImageProps {
  onSelected?: (images: Array<Image>) => void;
  multi?: boolean;
}

export const CatalogsSearchImage = ({ onSelected, multi }: CatalogsSearchImageProps) => {
  const { onClose } = useModal();
  const { getCatalogsImages } = useGetCatalogsImages();

  const { data, setData } = useSimpleSlice<FetchData<UseGetCatalogImagesResponse>>(
    'modal_catalogsSearchImage',
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
        })),
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

  const content = (
    <div>
      <SearchFilter
        value={search}
        hideButtons
        placeholder="Buscar"
        onChange={(search) => {
          setSearch(search);

          if (search) {
            searchDebouncer(() => {
              getCatalogsImages.fetch(
                { search },
                {
                  onAfterSuccess: setData,
                },
              );
            }, 500);
          } else {
            setData(null);
          }

          setSearch(search);
        }}
      />
      <p className="mt-3 text-gray-400">
        {`(${multi ? 'Seleccione una o varias imágenes' : 'Seleccione una imagen'})`}
      </p>
      <div className="h-[calc(100vh-18rem)] overflow-y-auto">{renderImageGallery()}</div>
    </div>
  );

  return (
    <Modal
      title="Catálogos de imágenes"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<Button label="Seleccionar" onClick={handleSubmit} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};

export default CatalogsSearchImage;
