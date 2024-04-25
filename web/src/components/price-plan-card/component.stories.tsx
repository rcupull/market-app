import { PricePlanCard } from '.';

export default {
  component: PricePlanCard,
};

export const Default = () => {
  return (
    <PricePlanCard
      name="Principiante"
      description="Perfecto para los que estan comenzando en el mundo del negocio"
      price={300}
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

export const Popular = () => {
  return (
    <PricePlanCard
      name="Principiante"
      popular
      description="Perfecto para los que estan comenzando en el mundo del negocio"
      price={300}
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

export const Free = () => {
  return (
    <PricePlanCard
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
