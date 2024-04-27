import { PricePlanCard } from 'components/price-plan-card';

import { PaymentPlan, PaymentPlanType } from 'types/payment';

const labels: Record<PaymentPlanType, string> = {
  free: 'Gratis',
  beginner: 'Principiante',
  professional: 'Profesional',
  company: 'Empresarial',
};

const descriptions: Record<PaymentPlanType, string> = {
  free: 'Ideal para probar nuestras prestaciones y funcionalidades libre de costo y sin compromisos',
  beginner:
    'Perfecto para los que estan comenzando en el mundo del comercio y requieres exponer sus productos',
  professional:
    'Usado por medianos negocios que pueden tener integracion con otros negocios similares y requieren control sobre sus ventas',
  company: 'Perfecto para los que estan comenzando en el mundo del comercio',
};

interface PaymentPlanCardProps {
  onClick?: () => void;
  paymentPlan: PaymentPlan;
}
export const PaymentPlanCard = ({ onClick, paymentPlan }: PaymentPlanCardProps) => {
  const { type, price, maxBussinessByUser, maxPostsByBussiness, trialTime } = paymentPlan;

  return (
    <PricePlanCard
      onClick={onClick}
      name={labels[type]}
      description={descriptions[type]}
      price={price}
      items={[
        {
          description: trialTime ? `Primeros ${trialTime} días de prueba` : 'Gratis por siempre',
          included: true,
        },
        {
          description: `Puede crear hasta ${maxBussinessByUser} negocios`,
          included: true,
        },
        {
          description: `Hasta ${maxPostsByBussiness} publicaciones por cada negocio`,
          included: true,
        },
      ]}
    />
  );
};
