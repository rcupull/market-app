import { Link } from 'react-router-dom';

import { EmptyImage } from 'components/empty-image';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { getBusinessCategoryLabel } from 'utils/business';
import { cn } from 'utils/general';
export interface BusinessCardSimpleProps extends StyleProps {
  business: Business;
  href: string;
  getImageSrc?: (src: string) => string;
}

export const BusinessCardSimple = ({
  business,
  getImageSrc,
  className,
  href,
}: BusinessCardSimpleProps) => {
  const { category, name, bannerImages } = business;

  const image = bannerImages?.[0];
  const imageSrc = (image && getImageSrc?.(image.src)) || image?.src;

  return (
    <Link data-id="ProductSimple" className={cn('group', className)} to={href}>
      <div className="h-80 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} className="object-contain object-center group-hover:opacity-75" />
        ) : (
          <div className="flex items-center justify-center h-64 w-64">
            <EmptyImage className="h-32 w-32" />
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <h3 className="mt-4 text-sm text-gray-700">{getBusinessCategoryLabel(category)}</h3>
    </Link>
  );
};
