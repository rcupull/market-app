import { render } from '@testing-library/react';

import { HeroSectionCentered } from '.';

import { getWrapper } from 'utils/test-utils';

describe('HeroSectionCentered', () => {
  it('render', async () => {
    const result = render(<HeroSectionCentered />, {
      wrapper: getWrapper({ useRouter: true, useRedux: true })
    });

    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="relative isolate px-6 lg:px-8 mx-auto"
          data-id="HeroSectionCentered"
        >
          <div
            class="mx-auto max-w-2xl py-16 lg:py-32"
          >
            <div
              class="hidden sm:mb-8 sm:flex sm:justify-center"
            />
            <div
              class="text-center"
            >
              <h1
                class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Recursos para enriquecer tu negocio online
              </h1>
              <p
                class="mt-6 text-lg leading-8 text-gray-600"
              >
                El emprendimiento es algo grande, no desprecies a quien no lo hace. Quien trabaja duro, quien ama el dolor, quien construye sus sueños, siempre será triunfador.
              </p>
              <div
                class="mt-10 flex items-center justify-center gap-x-6"
              >
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit bg-indigo-600 text-white fill-white hover:bg-indigo-500 hover:bg-indigo-500"
                >
                  Registrarse
                </button>
                <a
                  class="text-sm font-semibold leading-6 text-gray-900"
                  href="/about-us"
                >
                  Conocer más 
                  <span
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
              <div
                class="mt-6"
              >
                Si ya tienes cuenta
                 
                <button
                  class="relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap h-fit text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit !inline-block !text-[16px]"
                >
                  inicia sesión
                </button>
                , compra o gestiona tus negocios.
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
