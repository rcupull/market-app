import { SettingBox } from 'components/setting-box';

import SvgCodeBranchSolid from 'icons/CodeBranchSolid';
import SvgFileInvoiceSolid from 'icons/FileInvoiceSolid';
import SvgHandHoldingUsdSolid from 'icons/HandHoldingUsdSolid';
import SvgUserSecretSolid from 'icons/UserSecretSolid';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useAdminConfigUpdateFeatures } from 'pages/@modals/useAdminConfigUpdateFeatures';
import { useAdminConfigUpdatePrice } from 'pages/@modals/useAdminConfigUpdatePrice';
import { useAdminConfigUpdatePrivacyPolicy } from 'pages/@modals/useAdminConfigUpdatePrivacyPolicy';
import { useAdminConfigUpdateTermsAndConditions } from 'pages/@modals/useAdminConfigUpdateTermsAndConditions';

export const Settings = () => {
  const adminConfigUpdateTermsAndConditions = useAdminConfigUpdateTermsAndConditions();
  const adminConfigUpdatePrivacyPolicy = useAdminConfigUpdatePrivacyPolicy();
  const adminConfigUpdatePrice = useAdminConfigUpdatePrice();
  const adminConfigUpdateFeatures = useAdminConfigUpdateFeatures();

  return (
    <LayoutPageSection title="Configuración">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <SettingBox
          title="Términos y condiciones"
          svg={SvgFileInvoiceSolid}
          onClick={() => adminConfigUpdateTermsAndConditions.open()}
        />

        <SettingBox
          title="Política de Privacidad"
          svg={SvgUserSecretSolid}
          onClick={() => adminConfigUpdatePrivacyPolicy.open()}
        />

        <SettingBox
          title="Precios"
          svg={SvgHandHoldingUsdSolid}
          onClick={() => adminConfigUpdatePrice.open()}
        />

        <SettingBox
          title="Features"
          svg={SvgCodeBranchSolid}
          onClick={() => adminConfigUpdateFeatures.open()}
        />
      </div>
    </LayoutPageSection>
  );
};
