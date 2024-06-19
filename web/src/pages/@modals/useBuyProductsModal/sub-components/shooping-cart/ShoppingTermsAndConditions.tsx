import { HtmlTextContainer } from 'components/html-text-container';

import { useBusinessShoppingTermsAndConditionsModal } from '../../../useBusinessShoppingTermsAndConditionsModal';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';

export const ShoppingTermsAndConditions = () => {
  const businessShoppingTermsAndConditionsModal = useBusinessShoppingTermsAndConditionsModal();
  const { business } = useBusiness();

  const info = business?.shoppingMeta?.termsAndConditions;

  return (
    <UpdateSomethingContainer
      title="Términos y Condiciones para la venta de productos"
      onClick={() => businessShoppingTermsAndConditionsModal.open()}
    >
      {info ? (
        <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: info }} />
      ) : (
        <div className="h-14 flex items-center justify-center bg-gray-300">No hay información </div>
      )}
    </UpdateSomethingContainer>
  );
};
