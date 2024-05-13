import { Link } from 'react-router-dom';

import { Button } from 'components/button';

import { useAuth } from 'features/api-slices/useAuth';

import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useAuthSignUpModal } from 'pages/@modals/useAuthSignUpModal';

export const HeroSectionCentered = () => {
  const authSignUpModal = useAuthSignUpModal();
  const authSignInModal = useAuthSignInModal();
  const { isAuthenticated } = useAuth();

  return (
    <div data-id="HeroSectionCentered" className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 lg:py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Datos para enriquecer tu negocio online
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sin embargo, algunas grandes cosas no salen del alma. El que desea las ventajas de
            Internet. Hay algunas personas que van a huir de la oscuridad.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!isAuthenticated && (
              <Button label="Registrarse" onClick={() => authSignUpModal.open()} />
            )}
            <Link to="/about-us" className="text-sm font-semibold leading-6 text-gray-900">
              Conocer más <span aria-hidden="true">→</span>
            </Link>
          </div>

          {!isAuthenticated && (
            <div className="mt-6">
              Si ya tienes cuenta{' '}
              <Button
                className="!inline-block !text-[16px]"
                label="inicia sesión"
                onClick={() => authSignInModal.open()}
                variant="link"
              />
              , compra o gestiona tus negocios.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
