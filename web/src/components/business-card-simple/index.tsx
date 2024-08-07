import { Link } from 'react-router-dom';

import { EmptyImage } from 'components/empty-image';

import { BusinessFavoriteButton } from 'pages/@common/business-favorite-button';
import { BusinessSummary } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
export interface BusinessCardSimpleProps extends StyleProps {
  businessSummary: BusinessSummary;
  href: string;
  getImageSrc?: (src: string) => string;
}

export const BusinessCardSimple = ({
  businessSummary,
  getImageSrc,
  className,
  href
}: BusinessCardSimpleProps) => {
  const { name, images, routeName } = businessSummary;

  const image = images?.[0];
  const imageSrc = (image && getImageSrc?.(image.src)) || image?.src;

  return (
    <Link data-id="BusinessCardSimple" className={cn('group size-full', className)} to={href}>
      <div className="relative overflow-hidden border border-gray-300 rounded-lg flex flex-col items-center justify-between size-full">
        <div className="w-full p-2">
          {imageSrc ? (
            <img src={imageSrc} className="object-contain object-center group-hover:opacity-75" />
          ) : (
            <div className="flex items-center justify-center size-full">
              <EmptyImage className="size-full" />
            </div>
          )}
        </div>
        <h3 className="my-4 text-lg text-gray-500 font-bold">{name}</h3>

        <BusinessFavoriteButton
          preventDefault
          routeName={routeName}
          className="!absolute right-0 bottom-0"
        />
      </div>
    </Link>
  );
};
