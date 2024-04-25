import { Image, StyleProps } from 'types/general';

export interface ProductImagesProps extends StyleProps {
  value?: Array<Image>;
  getImageUrl?: (src: string) => string;
}
