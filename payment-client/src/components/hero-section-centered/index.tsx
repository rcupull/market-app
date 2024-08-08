import { HtmlTextContainer } from 'components/html-text-container';

export const HeroSectionCentered = () => {
  return (
    <HtmlTextContainer
      data-id="HeroSectionCentered"
      className="relative isolate px-6 lg:px-8 mx-auto"
    >
      <div className="mx-auto max-w-2xl py-4 sm:py-16 lg:py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="flex flex-col gap-14 text-center items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Cliente de pago para la plataforma Asere Market
            </h1>
          </div>
        </div>
      </div>
    </HtmlTextContainer>
  );
};
