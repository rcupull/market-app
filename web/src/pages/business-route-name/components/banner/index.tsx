import { EmptyImage } from 'components/empty-image';
import { Swiper } from 'components/swiper';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateBanner } from 'pages/@modals/useBusinessUpdateBanner';
import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { cn } from 'utils/general';

export interface BannerProps extends StyleProps {}

export const Banner = ({ className }: BannerProps) => {
  const businessUpdateBanner = useBusinessUpdateBanner();
  const { business } = useBusiness();
  const { bannerImages, layouts } = business || {};

  const bannerLayout = layouts?.banner;

  if (bannerLayout?.type === 'none') {
    return <></>;
  }

  const renderContainer = (content: React.ReactNode) => (
    <UpdateSomethingContainer title="Editar el banner" onClick={() => businessUpdateBanner.open()}>
      {content}
    </UpdateSomethingContainer>
  );

  const renderContent = (args: { content?: React.ReactNode; href?: string }) => {
    const { content, href } = args;

    if (href) {
      return (
        <a
          href={href}
          className={cn('h-96 flex items-center justify-center', className)}
          target="_blank"
          rel="noreferrer"
        >
          {content || <EmptyImage />}
        </a>
      );
    }

    return (
      <div className={cn('h-96 flex items-center justify-center', className)}>
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
      }),
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
      ),
    );
  }

  return <></>;
};
