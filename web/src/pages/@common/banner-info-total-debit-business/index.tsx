import { LabelValuePair } from 'components/label-value-pair';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export const BannerInfoTotalDebitBusiness = ({ className }: StyleProps) => {
  const { business } = useBusiness();
  const { getEnabledFeature } = useAdminConfig();

  if (!business || !getEnabledFeature('BILLIING_THE_BUSINESS')) {
    return <></>;
  }
  const { shoppingDebit } = business || {};

  return (
    <LabelValuePair
      label={<span className="text-nowrap">Débito</span>}
      value={<span className="text-nowrap">{` ${shoppingDebit} CUP`}</span>}
      className={cn('ring-1 ring-gray-400 rounded-2xl py-0.5 px-2', className)}
    />
  );
};
