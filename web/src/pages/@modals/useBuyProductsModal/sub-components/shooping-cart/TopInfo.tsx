import { HtmlTextContainer } from 'components/html-text-container';

import { usePurchaseRequestTopInfoModal } from '../../../usePurchaseRequestTopInfoModal';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusiness } from 'pages/@hooks/useBusiness';

export const TopInfo = () => {
  const purchaseRequestTopInfoModal = usePurchaseRequestTopInfoModal();
  const { business } = useBusiness();

  const info = business?.shoppingMeta?.purchaseRequestTopInfo;

  return (
    <UpdateSomethingContainer
      title="Editar infoamcion de venta"
      onClick={() => purchaseRequestTopInfoModal.open()}
    >
      {info ? (
        <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: info }} />
      ) : (
        <div className="h-14 flex items-center justify-center bg-gray-300">No hay información </div>
      )}
    </UpdateSomethingContainer>
  );
};
