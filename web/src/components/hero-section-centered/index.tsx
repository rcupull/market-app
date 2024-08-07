import { Link } from 'react-router-dom';

import { Button } from 'components/button';
import { HtmlTextContainer } from 'components/html-text-container';
import { IconButton } from 'components/icon-button';

import { useAuth } from 'features/api-slices/useAuth';

import SvgAndroid from 'icons/Android';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useAuthSignUpModal } from 'pages/@modals/useAuthSignUpModal';
import { getUploadedFileRoute } from 'utils/business';

export const HeroSectionCentered = () => {
  const { authSignUpModal } = useAuthSignUpModal();
  const { authSignInModal } = useAuthSignInModal();
  const { isAuthenticated } = useAuth();

  return (
    <HtmlTextContainer
      data-id="HeroSectionCentered"
      className="relative isolate px-6 lg:px-8 mx-auto"
    >
      <div className="mx-auto max-w-2xl py-4 sm:py-16 lg:py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="flex flex-col gap-14 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Recursos para enriquecer tu negocio online
            </h1>

            <p className="text-lg leading-8 text-gray-600 hidden sm:block">
              El emprendimiento es algo grande. Quien trabaja
              duro, quien ama el dolor, quien construye sus sueños, siempre será triunfador.
            </p>
          </div>

          <div className="flex items-center justify-center gap-x-6">
            {!isAuthenticated && (
              <Button label="Registrarse" onClick={() => authSignUpModal.open()} />
            )}
            <Link to="/about-us" className="text-md font-semibold leading-6 text-gray-900">
              Conocer más <span aria-hidden="true">→</span>
            </Link>
          </div>

          {!isAuthenticated && (
            <div>
              Si ya tienes cuenta{' '}
              <Button
                className="!inline-block !text-[16px]"
                label="inicia sesión"
                onClick={() => authSignInModal.open()}
                variant="link"
              />
              , para comprar o gestionar tus negocios.
            </div>
          )}

          <a
            target="_blank"
            href={getUploadedFileRoute({ filename: 'asere-market.apk' })}
            rel="noreferrer"
            className="flex justify-center"
          >
            <Button
              svg={() => <SvgAndroid className="size-8" />}
              label="Descargar asere-market.apk"
              className="!py-1"
            />
          </a>
        </div>
      </div>
    </HtmlTextContainer>
  );
};
