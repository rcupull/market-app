import { HtmlTextContainer } from 'components/html-text-container';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { StyleProps } from 'types/general';

export interface PrivacyPolicyProps extends StyleProps {}

export const PrivacyPolicy = ({ className }: PrivacyPolicyProps) => {
  const { data } = useAdminConfig();
  return (
    <HtmlTextContainer
      dangerouslySetInnerHTML={{ __html: data?.privacyPolicy || '' }}
      className={className}
    />
  );
};

export default PrivacyPolicy;
