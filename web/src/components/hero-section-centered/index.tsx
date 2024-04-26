import { Link } from 'react-router-dom';

import { Button } from 'components/button';

import { useAuthSignUpModal } from 'pages/@modals/useAuthSignUpModal';

export const HeroSectionCentered = () => {
  const authSignUpModal = useAuthSignUpModal();
  return (
    <div data-id="HeroSectionCentered" className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{' '}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Datos para enriquecer tu negocio online
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sin embargo, algunas grandes cosas no salen del alma. El que desea las ventajas de
            Internet. Hay algunas personas que van a huir de la oscuridad.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button label="Registrarse" onClick={() => authSignUpModal.open()} />
            <Link to="/about-us" className="text-sm font-semibold leading-6 text-gray-900">
              Conocer más <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
