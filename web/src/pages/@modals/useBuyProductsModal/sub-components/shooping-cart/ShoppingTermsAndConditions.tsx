import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { FieldCheckbox } from 'components/field-checkbox';
import { HtmlTextContainer } from 'components/html-text-container';
import { WarningViewOnlyAdmin } from 'components/warning-view-only-admin';

import { useBusinessShoppingTermsAndConditionsModal } from '../../../useBusinessShoppingTermsAndConditionsModal';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';

export interface ShoppingTermsAndConditionsProps extends StyleProps {
  approved: boolean;
  onApprobed: (value: boolean) => void;
}

export const ShoppingTermsAndConditions = ({
  approved,
  onApprobed,
  className,
}: ShoppingTermsAndConditionsProps) => {
  const businessShoppingTermsAndConditionsModal = useBusinessShoppingTermsAndConditionsModal();
  const { business, owner } = useBusiness();

  const info = business?.shoppingMeta?.termsAndConditions;

  useEffect(() => {
    if (!info) {
      onApprobed(true);
    }
  }, [info]);

  return (
    <UpdateSomethingContainer
      title="Términos y Condiciones para la venta de productos"
      onClick={() => businessShoppingTermsAndConditionsModal.open()}
      className={className}
    >
      {info && (
        <div className="w-full p-3 ring-2 ring-yellow-500 rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
          <Badge variant="warning" />
          <div className="flex flex-col ml-4 mt-2 sm:mt-0">
            <span className="font-semibold text-center sm:text-left">
              Términos y condiciones para la compra en este negocio
            </span>

            <HtmlTextContainer className="mt-3" dangerouslySetInnerHTML={{ __html: info }} />

            <FieldCheckbox
              label="Estoy de acuerdo con los términos y condiciones"
              noUseFormik
              value={approved}
              onChange={(e) => onApprobed(e.target.checked)}
              className="mt-5"
            />
          </div>
        </div>
      )}

      {!info && owner && (
        <div className="flex flex-col items-center bg-gray-300 p-3">
          <WarningViewOnlyAdmin />
          <span className="text-xl mt-2">Este negocio no posee términos y condiciones</span>
        </div>
      )}
    </UpdateSomethingContainer>
  );
};
