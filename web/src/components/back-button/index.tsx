import { IconButton } from 'components/icon-button';

import { useRouter } from 'hooks/useRouter';

import SvgArrowLeftSolid from 'icons/ArrowLeftSolid';

export const BackButton = () => {
  const { onBack } = useRouter();
  return <IconButton onClick={onBack} svg={SvgArrowLeftSolid} className="ring-0" />;
};
