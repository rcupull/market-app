import { LayoutPage } from 'pages/@common/layout-page';
import { TermsAndConditions as TermsAndConditionsBase } from 'pages/@common/terms-and-conditions';

export const TermsAndConditions = () => {
  return (
    <LayoutPage title="Términos y condiciones">
      <TermsAndConditionsBase />
    </LayoutPage>
  );
};

export default TermsAndConditions;
