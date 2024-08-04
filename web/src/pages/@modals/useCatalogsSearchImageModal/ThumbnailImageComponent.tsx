import { useEffect, useRef, useState } from 'react';
//eslint-disable-next-line
import { ThumbnailImageProps } from 'react-grid-gallery';

import { EmptyImage } from 'components/empty-image';

import { useOnScreen } from 'hooks/useOnScreen';

export const ThumbnailImageComponent = ({ imageProps }: ThumbnailImageProps) => {
  const { style } = imageProps;
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    }
  }, [isVisible]);

  if (show) {
    //@ts-expect-error ignore title error type
    return <img {...imageProps} />;
  }

  return (
    <div ref={ref} style={{ ...style }} className="flex items-center justify-center">
      <EmptyImage className="h-12 w-12" />
    </div>
  );
};
