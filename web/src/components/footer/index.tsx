import { Link } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import {
  SocialNetworkFace,
  SocialNetworkIg,
  SocialNetworkIn,
  SocialNetworkX,
} from './components/social-network-icons';

import { SocialLinks } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterProps extends StyleProps {
  socialLinks: SocialLinks;
}

export const Footer = ({ className, socialLinks }: FooterProps) => {
  const { face, instagram, linkedin, twitter } = socialLinks;

  const renderSocialNetworkLink = (Icon: React.FunctionComponent, href?: string) => {
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
        <Icon />
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
        <div className="container px-6 pt-6 flex">
          <div className="flex flex-col">
            <Link to="/terms-and-conditions">Términos y Condiciones</Link>
            <Link to="/privacy-policy">Política de Privacidad</Link>
          </div>

          <div className="mb-6 flex justify-center">
            {renderSocialNetworkLink(SocialNetworkFace, face)}
            {renderSocialNetworkLink(SocialNetworkIg, instagram)}
            {renderSocialNetworkLink(SocialNetworkIn, linkedin)}
            {renderSocialNetworkLink(SocialNetworkX, twitter)}
          </div>

          {/* <div>
          <form action="">
            <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
              <div className="md:mb-6 md:ml-auto">
                <p className="">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="relative md:mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] text-neutral-200 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                />
                <label
                  htmlFor="exampleFormControlInput1"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-neutral-200 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                >
                  Email address
                </label>
              </div>

              <div className="mb-6 md:mr-auto">
                <button
                  type="submit"
                  className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div> */}

          {/* <div className="mb-6">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat
            quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum
            corrupti dicta, aliquam sequi voluptate quas.
          </p>
        </div> */}

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4">
          <div className="mb-6">
            <h5 className="mb-2.5 font-bold uppercase">Links</h5>

            <ul className="mb-0 list-none">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h5 className="mb-2.5 font-bold uppercase">Links</h5>

            <ul className="mb-0 list-none">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h5 className="mb-2.5 font-bold uppercase">Links</h5>

            <ul className="mb-0 list-none">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h5 className="mb-2.5 font-bold uppercase">Links</h5>

            <ul className="mb-0 list-none">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        </div>

        <div className="w-full p-4 text-center">© 2024 Todos los derechos reservados</div>
      </HtmlTextContainer>
    </footer>
  );
};
