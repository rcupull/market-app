import { SettingBox } from 'components/setting-box';

import SvgCodeBranchSolid from 'icons/CodeBranchSolid';
import SvgFileInvoiceSolid from 'icons/FileInvoiceSolid';
import SvgHandHoldingUsdSolid from 'icons/HandHoldingUsdSolid';
import SvgUserSecretSolid from 'icons/UserSecretSolid';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useAdminConfigUpdateFeaturesModal } from 'pages/@modals/useAdminConfigUpdateFeaturesModal';
import { useAdminConfigUpdatePriceModal } from 'pages/@modals/useAdminConfigUpdatePriceModal';
import { useAdminConfigUpdatePrivacyPolicyModal } from 'pages/@modals/useAdminConfigUpdatePrivacyPolicyModal';
import { useAdminConfigUpdateTermsAndConditionsModal } from 'pages/@modals/useAdminConfigUpdateTermsAndConditionsModal';

export const Settings = () => {
  const { adminConfigUpdateTermsAndConditionsModal } =
    useAdminConfigUpdateTermsAndConditionsModal();
  const { adminConfigUpdatePrivacyPolicyModal } = useAdminConfigUpdatePrivacyPolicyModal();
  const { adminConfigUpdatePriceModal } = useAdminConfigUpdatePriceModal();
  const { adminConfigUpdateFeaturesModal } = useAdminConfigUpdateFeaturesModal();

  return (
    <LayoutPageSection title="Configuración">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <SettingBox
          title="Términos y condiciones"
          svg={SvgFileInvoiceSolid}
          onClick={() => adminConfigUpdateTermsAndConditionsModal.open()}
        />

        <SettingBox
          title="Política de Privacidad"
          svg={SvgUserSecretSolid}
          onClick={() => adminConfigUpdatePrivacyPolicyModal.open()}
        />

        <SettingBox
          title="Precios"
          svg={SvgHandHoldingUsdSolid}
          onClick={() => adminConfigUpdatePriceModal.open()}
        />

        <SettingBox
          title="Features"
          svg={SvgCodeBranchSolid}
          onClick={() => adminConfigUpdateFeaturesModal.open()}
        />
      </div>
    </LayoutPageSection>
  );
};
