import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { IconButton } from 'components/icon-button';

import { useRouter } from 'hooks/useRouter';

export const BackButton = () => {
  const { onBack } = useRouter();
  return <IconButton onClick={onBack} svg={ArrowLeftIcon} className="ring-0" />;
};
