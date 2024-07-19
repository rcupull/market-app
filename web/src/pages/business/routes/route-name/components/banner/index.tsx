import { EmptyImage } from 'components/empty-image';
import { Swiper } from 'components/swiper';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateBannerModal } from 'pages/@modals/useBusinessUpdateBannerModal';
import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { cn } from 'utils/general';

export interface BannerProps extends StyleProps {}

export const Banner = ({ className }: BannerProps) => {
  const businessUpdateBanner = useBusinessUpdateBannerModal();
  const { business, onFetch } = useBusiness();
  const { bannerImages, layouts } = business || {};

  const bannerLayout = layouts?.banner;

  if (bannerLayout?.type === 'none') {
    return <></>;
  }

  const renderContainer = (content: React.ReactNode) => (
    <UpdateSomethingContainer
      title="Editar el banner"
      onClick={() =>
        businessUpdateBanner.open({
          onAfterSuccess: () => {
            business && onFetch({ routeName: business.routeName });
          },
        })
      }
      className={className}
    >
      {content}
    </UpdateSomethingContainer>
  );

  const renderContent = (args: { content?: React.ReactNode; href?: string }) => {
    const { content, href } = args;

    if (href) {
      return (
        <a
          href={href}
          className={cn('h-40 sm:h-96 flex items-center justify-center')}
          target="_blank"
          rel="noreferrer"
        >
          {content || <EmptyImage />}
        </a>
      );
    }

    return (
      <div className={cn('h-40 sm:40 md:h-60 lg:80 xl:h-96 flex items-center justify-center')}>
        {content || <EmptyImage />}
      </div>
    );
  };

  if (bannerLayout?.type === 'static') {
    const { src, href } = bannerImages?.[0] || {};

    return renderContainer(
      renderContent({
        content: (
          <img src={src && getImageEndpoint(src)} className="object-contain w-full h-full" />
        ),
        href,
      })
    );
  }

  if (bannerLayout?.type === 'swipableClassic') {
    return renderContainer(
      bannerImages?.length && (
        <Swiper
          autoplay={{
            delay: 5000,
          }}
          items={bannerImages?.map(({ src, href }) => {
            return {
              content: renderContent({
                content: (
                  <img
                    src={src && getImageEndpoint(src)}
                    className="object-contain w-full h-full"
                  />
                ),
                href,
              }),
            };
          })}
        />
      )
    );
  }

  return <></>;
};
