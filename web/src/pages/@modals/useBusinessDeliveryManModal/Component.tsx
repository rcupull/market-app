import { useEffect } from 'react';

import { useGetAllDeliveryMan } from 'features/api/user/useGetAllDeliveryMan';

import { useBusiness } from '../../@hooks/useBusiness';
import { DeliveryManView } from './DeliveryManView';

export const Component = () => {
  const { business } = useBusiness();

  const { getAllDeliveryMan } = useGetAllDeliveryMan();

  const fetchAllDeliveryMan = () => {
    getAllDeliveryMan.fetch();
  };

  useEffect(() => {
    fetchAllDeliveryMan();
  }, []);

  if (!business) {
    return <></>;
  }

  const allDeliveryMan = getAllDeliveryMan.data || [];

  return (
    <div className="flex flex-wrap gap-6">
      {allDeliveryMan?.map((deliveryMan, index) => {
        return (
          <DeliveryManView
            key={index}
            business={business}
            onAfterSuccess={fetchAllDeliveryMan}
            user={deliveryMan}
          />
        );
      })}
    </div>
  );
};

export default Component;
