import { Link } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { useRouter } from 'hooks/useRouter';

import SvgFacebookF from 'icons/FacebookF';
import SvgInstagram from 'icons/Instagram';
import SvgLinkedinIn from 'icons/LinkedinIn';
import SvgTwitter from 'icons/Twitter';
import { SocialLinks } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterProps extends StyleProps {
  socialLinks: SocialLinks;
}

export const Footer = ({ className, socialLinks }: FooterProps) => {
  const { face, instagram, linkedin, twitter } = socialLinks;
  const { isOneBusinessPage } = useRouter();

  const renderSocialNetworkLink = (svg: React.ReactNode, href?: string) => {
    if (!href) {
      return null;
    }

    return (
      <a
        href={href}
        className={cn(
          'm-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0',
          className,
        )}
        target="_blank"
        rel="noreferrer"
      >
        {svg}
      </a>
    );
  };
  return (
    <footer className={cn('shadow-lg -scale-y-100', className)}>
      <HtmlTextContainer
        className={cn(
          '-scale-y-100 flex flex-col items-center bg-white shadow-xl text-center text-gray-700',
        )}
      >
        <div className="container px-6 pt-2 flex flex-col-reverse sm:flex-row sm:justify-between">
          {!isOneBusinessPage && (
            <div className="flex flex-col">
              <Link to="/terms-and-conditions">Términos y Condiciones</Link>
              <Link to="/privacy-policy">Política de Privacidad</Link>
            </div>
          )}

          <div className="flex justify-center">
            {renderSocialNetworkLink(<SvgFacebookF className="size-7 fill-blue-700" />, face)}
            {renderSocialNetworkLink(<SvgInstagram className="size-7 fill-red-500" />, instagram)}
            {renderSocialNetworkLink(
              <SvgLinkedinIn className="size-7 fill-white bg-blue-500 rounded-lg" />,
              linkedin,
            )}
            {renderSocialNetworkLink(
              <SvgTwitter className="size-7 fill-white bg-blue-500 rounded-lg" />,
              twitter,
            )}
          </div>
        </div>

        <div className="w-full p-4 text-center">© 2024 Todos los derechos reservados</div>
      </HtmlTextContainer>
    </footer>
  );
};
