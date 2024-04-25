import { PricePlanCard } from 'components/price-plan-card';

import { PaymentPlanType } from 'types/payment';
interface PlanCompanyProps {
  onClick?: (type: PaymentPlanType) => void;
}
export const PlanCompany = (props: PlanCompanyProps) => {
  return (
    <PricePlanCard
      onClick={() => props?.onClick?.('company')}
      name="Empresarial"
      description="Perfecto para los que estan comenzando en el mundo del negocio"
      price={500}
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
