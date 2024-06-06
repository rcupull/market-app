import { SettingBox } from 'components/setting-box';

import SvgFileInvoiceSolid from 'icons/FileInvoiceSolid';
import { useAdminConfigUpdateTermsAndConditions } from 'pages/@modals/useAdminConfigUpdateTermsAndConditions';

export const Settings = () => {
  const adminConfigUpdateTermsAndConditions = useAdminConfigUpdateTermsAndConditions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
      <SettingBox
        title="Términos y condiciones"
        svg={SvgFileInvoiceSolid}
        onClick={() => adminConfigUpdateTermsAndConditions.open()}
      />
    </div>
  );
};
