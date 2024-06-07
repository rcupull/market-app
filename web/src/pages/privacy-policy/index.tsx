import { LayoutPage } from 'pages/@common/layout-page';
import { PrivacyPolicy as PrivacyPolicyBase } from 'pages/@common/privacy-policy';

export const PrivacyPolicy = () => {
  return (
    <LayoutPage title="Política de privacidad">
      <PrivacyPolicyBase />
    </LayoutPage>
  );
};

export default PrivacyPolicy;
