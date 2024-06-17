import { HtmlTextContainer } from 'components/html-text-container';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { StyleProps } from 'types/general';

export interface PricesProps extends StyleProps {}

export const Price = ({ className }: PricesProps) => {
  const { data } = useAdminConfig();
  return (
    <HtmlTextContainer
      dangerouslySetInnerHTML={{ __html: data?.price || '' }}
      className={className}
    />
  );
};

export default Price;
