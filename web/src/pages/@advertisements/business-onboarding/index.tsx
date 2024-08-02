import { Button } from 'components/button';
import { HighlightedBox } from 'components/highlighted-box';

import { useUpdateChecksBusiness } from 'features/api/business/useUpdateChecksBusiness';

import { GotItBox } from '../GotItBox';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessOnboardingModal } from 'pages/@modals/useBusinessOnboardingModal';

export const AdvertisementsBusinessOnboarding = () => {
  const { businessOnboardingModal } = useBusinessOnboardingModal();
  const { business, onFetch } = useBusiness();

  const { updateChecksBusiness } = useUpdateChecksBusiness();

  if (!business) {
    return <></>;
  }

  if (!business.checks?.doneOnboarding) {
    return (
      <HighlightedBox variant="info">
        <GotItBox
          gotItButtonProps={{
            isBusy: updateChecksBusiness.status.isBusy,
            label: 'Ignorar',
            onClick: () => {
              updateChecksBusiness.fetch(
                {
                  routeName: business?.routeName,
                  update: {
                    doneOnboarding: true,
                  },
                },
                {
                  onAfterSuccess: () => {
                    onFetch({ routeName: business?.routeName });
                  },
                }
              );
            },
          }}
        >
          <span>
            Parece que este negocio es recién creado. En nuestra
            <Button
              variant="link"
              label="configuración básica"
              onClick={() => businessOnboardingModal.open()}
              className="!inline-block !text-lg !mx-1"
            />
            podrás introducirte en los aspectos esenciales para poner en línea tu negocio
            rápidamente.
          </span>
        </GotItBox>
      </HighlightedBox>
    );
  }

  return <></>;
};
