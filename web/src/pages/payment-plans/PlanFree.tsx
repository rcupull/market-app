import { PricePlanCard } from 'components/price-plan-card';

import { PaymentPlanType } from 'types/payment';

interface PlanFreeProps {
  onClick?: (type: PaymentPlanType) => void;
}

export const PlanFree = ({ onClick }: PlanFreeProps) => {
  return (
    <PricePlanCard
      onClick={() => onClick?.('free')}
      name="Gratis"
      free
      description="Perfecto para los que estan comenzando en el mundo del negocio"
      price={0}
      items={[
        {
          description: '5 products',
          included: true,
        },
        {
          description: 'Up to 1,000 subscribers',
          included: true,
        },
        {
          description: 'Basic analytics',
          included: true,
        },
        {
          description: '48-hour support response time',
          included: true,
        },
        {
          description: 'Phone & email support',
          included: false,
        },
        {
          description: 'Custom reporting tools',
          included: false,
        },
      ]}
    />
  );
};
