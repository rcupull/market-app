import { HtmlTextContainer } from 'components/html-text-container';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { StyleProps } from 'types/general';

export interface TermsAndConditionsProps extends StyleProps {}

export const TermsAndConditions = ({ className }: TermsAndConditionsProps) => {
  const { data } = useAdminConfig();
  return <HtmlTextContainer dangerouslySetInnerHTML={{ __html: data?.termsAndConditions || '' }} className={className}/>;
};

export default TermsAndConditions;
