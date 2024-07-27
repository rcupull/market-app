import { Divider } from 'components/divider';
import { IconButtonAdd } from 'components/icon-button-add';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useAddOneDeliveryManToBusiness } from 'features/api/business/useAddOneDeliveryManToBusiness';
import { useRemoveOneDeliveryManFromBusines } from 'features/api/business/useRemoveOneDeliveryManFromBusines';

import { ListDetailsKey } from 'pages/@common/list-details-key';
import { ListDetailsValue } from 'pages/@common/list-details-value';
import { User } from 'types/auth';
import { Business } from 'types/business';

export interface DeliveryManViewProps {
  user: User;
  business: Business;
  onAfterSuccess: () => void;
}
export const DeliveryManView = ({ user, business, onAfterSuccess }: DeliveryManViewProps) => {
  const { addOneDeliveryManToBusiness } = useAddOneDeliveryManToBusiness();
  const { removeOneDeliveryManFromBusines } = useRemoveOneDeliveryManFromBusines();

  const { name, phone, _id, deliveryBusiness } = user;

  const workForMe = deliveryBusiness?.some(({ routeName }) => routeName === business?.routeName);

  return (
    <div className="flex items-center border border-gray-4  00 rounded-lg p-4">
      <div>
        <ListDetailsKey label="Nombre" />
        <ListDetailsValue value={name} />
        <Divider narrow />

        <ListDetailsKey label="Teléfono" />
        <ListDetailsValue value={phone} />
        <Divider narrow />
      </div>

      {!workForMe && (
        <IconButtonAdd
          isBusy={addOneDeliveryManToBusiness.status.isBusy}
          onClick={() => {
            addOneDeliveryManToBusiness.fetch(
              { userId: _id, routeName: business.routeName },
              {
                onAfterSuccess,
              },
            );
          }}
        />
      )}

      {workForMe && (
        <IconButtonRemove
          isBusy={removeOneDeliveryManFromBusines.status.isBusy}
          onClick={() => {
            removeOneDeliveryManFromBusines.fetch(
              { userId: _id, routeName: business.routeName },
              {
                onAfterSuccess,
              },
            );
          }}
        />
      )}
    </div>
  );
};
