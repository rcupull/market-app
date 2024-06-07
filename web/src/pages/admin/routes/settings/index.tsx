import { SettingBox } from 'components/setting-box';

import SvgFileInvoiceSolid from 'icons/FileInvoiceSolid';
import { useAdminConfigUpdatePrivacyPolicy } from 'pages/@modals/useAdminConfigUpdatePrivacyPolicy';
import { useAdminConfigUpdateTermsAndConditions } from 'pages/@modals/useAdminConfigUpdateTermsAndConditions';

export const Settings = () => {
  const adminConfigUpdateTermsAndConditions = useAdminConfigUpdateTermsAndConditions();
  const adminConfigUpdatePrivacyPolicy = useAdminConfigUpdatePrivacyPolicy();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
      <SettingBox
        title="Términos y condiciones"
        svg={SvgFileInvoiceSolid}
        onClick={() => adminConfigUpdateTermsAndConditions.open()}
      />

      <SettingBox
        title="Política de Privacidad"
        svg={SvgFileInvoiceSolid}
        onClick={() => adminConfigUpdatePrivacyPolicy.open()}
      />
    </div>
  );
};
